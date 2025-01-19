"use client";

import { useState, useEffect } from "react";
import { Check, X, Eye, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { Header } from "@/components/Header";

// Types
interface CandidateVote {
  candidateId: string;
  votes: number;
  candidateName: string;
}

interface VotingResult {
  id: string;
  centerName: string;
  department: string;
  commune: string;
  region: string;
  registeredVoters: number;
  actualVoters: number;
  nullVotes: number;
  blankVotes: number;
  candidateVotes: CandidateVote[];
  authenticated: boolean;
  pvImage: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function Page({ params }: { params: { id: string } }) {
  const [result, setResult] = useState<VotingResult | null>(null);
  const [showPvDialog, setShowPvDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les données du bureau
  useEffect(() => {
    const fetchBureauData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/bureaux/${params.id}`);
        if (!response.ok) throw new Error('Erreur lors du chargement des données');
        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchBureauData();
  }, [params.id]);

  // Calculs pour la validation
  const totalVotes = result?.candidateVotes.reduce(
    (sum, cv) => sum + cv.votes,
    0
  ) ?? 0;
  const totalProcessedVotes = totalVotes + (result?.nullVotes ?? 0) + (result?.blankVotes ?? 0);
  const hasDiscrepancy = result ? totalProcessedVotes !== result.actualVoters : false;

  const handleApprove = async () => {
    if (!result) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/bureaux/${result.id}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' })
      });

      if (!response.ok) throw new Error('Erreur lors de la validation');

      const updatedResult = await response.json();
      setResult(updatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la validation");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!result) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/bureaux/${result.id}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'rejected',
          reason: rejectionReason
        })
      });

      if (!response.ok) throw new Error('Erreur lors du rejet');

      const updatedResult = await response.json();
      setResult(updatedResult);
      setShowRejectionDialog(false);
      setRejectionReason("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du rejet");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !result) {
    return <div className="container mx-auto py-16 text-center">Chargement...</div>;
  }

  if (error && !result) {
    return (
      <div className="container mx-auto py-16">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!result) {
    return <div className="container mx-auto py-16 text-center">Bureau de vote non trouvé</div>;
  }

  return (
    <div className="container mx-auto py-16">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">
                Bureau de vote : {result.centerName}
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                {result.commune}, {result.department}, {result.region}
              </CardDescription>
            </div>
            <Badge
              variant={
                result.status === "approved"
                  ? "default"
                  : result.status === "rejected"
                  ? "destructive"
                  : "default"
              }
            >
              {result.status === "approved"
                ? "Validé"
                : result.status === "rejected"
                ? "Rejeté"
                : "En attente de validation"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Inscrits</p>
              <p className="text-xl font-bold">{result.registeredVoters}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Votants</p>
              <p className="text-xl font-bold">{result.actualVoters}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Taux participation</p>
              <p className="text-xl font-bold">
                {((result.actualVoters / result.registeredVoters) * 100).toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bulletins nuls</p>
              <p className="text-xl font-bold">{result.nullVotes}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Résultats par candidat</h3>
            <div className="grid gap-3">
              {result.candidateVotes.map((vote) => (
                <div
                  key={vote.candidateId}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{vote.candidateName}</span>
                  <div className="text-right">
                    <span className="font-bold">{vote.votes} voix</span>
                    <span className="text-gray-500 ml-2">
                      ({((vote.votes / result.actualVoters) * 100).toFixed(2)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {hasDiscrepancy && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Incohérence détectée : Le total des votes ({totalProcessedVotes})
                ne correspond pas au nombre de votants ({result.actualVoters})
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setShowPvDialog(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Voir PV
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowRejectionDialog(true)}
              disabled={result.status !== "pending" || loading}
            >
              <X className="mr-2 h-4 w-4" />
              Rejeter
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleApprove}
              disabled={result.status !== "pending" || loading}
            >
              <Check className="mr-2 h-4 w-4" />
              Valider
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showPvDialog} onOpenChange={setShowPvDialog}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>PV du bureau {result.centerName}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-full">
            <div className="aspect-[3/4] w-full bg-gray-100 flex items-center justify-center">
              <Image
                src={result.pvImage}
                alt="PV"
                className="w-full h-auto"
                width={400}
                height={800}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Motif du rejet</DialogTitle>
            <DialogDescription>
              Veuillez indiquer la raison du rejet des résultats.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Saisissez le motif du rejet..."
            className="min-h-[100px]"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectionDialog(false);
                setRejectionReason("");
              }}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectionReason.trim() || loading}
            >
              Confirmer le rejet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}