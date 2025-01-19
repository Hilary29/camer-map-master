"use client";

import { useState } from "react";
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

// Données de test pour un seul bureau
const MOCK_RESULT = {
  id: "1",
  centerName: "École Publique de Bastos",
  department: "Mfoundi",
  commune: "Yaoundé 1er",
  region: "Centre",
  registeredVoters: 450,
  actualVoters: 380,
  nullVotes: 15,
  blankVotes: 5,
  candidateVotes: [
    { candidateId: "1", votes: 180, candidateName: "Paul Biya" },
    { candidateId: "2", votes: 150, candidateName: "Maurice Kamto" },
    { candidateId: "3", votes: 30, candidateName: "Cabral L" },
  ],
  authenticated: false,
  pvImage: "/api/placeholder/800/1000",
  submissionDate: "2025-01-19T10:30:00",
  status: "pending",
};

export default function Page() {
  const [result, setResult] = useState(MOCK_RESULT);
  const [showPvDialog, setShowPvDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculs pour la validation
  const totalVotes = result.candidateVotes.reduce(
    (sum, cv) => sum + cv.votes,
    0
  );
  const totalProcessedVotes = totalVotes + result.nullVotes + result.blankVotes;
  const hasDiscrepancy = totalProcessedVotes !== result.actualVoters;

  const handleApprove = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResult((prev) => ({ ...prev, status: "approved" }));
    } catch (err) {
      setError("Erreur lors de la validation");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResult((prev) => ({ ...prev, status: "rejected" }));
      setShowRejectionDialog(false);
      setRejectionReason("");
    } catch (err) {
      setError("Erreur lors du rejet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-16 ">
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
                  ? "default" // Remplace 'success' par 'default'
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
          {/* Statistiques générales */}
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
                {(
                  (result.actualVoters / result.registeredVoters) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bulletins nuls</p>
              <p className="text-xl font-bold">{result.nullVotes}</p>
            </div>
          </div>

          {/* Résultats des candidats */}
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

          {/* Alerte si incohérence */}
          {hasDiscrepancy && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Incohérence détectée : Le total des votes ({totalProcessedVotes}
                ) ne correspond pas au nombre de votants ({result.actualVoters})
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

      {/* Dialog pour voir le PV */}
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

      {/* Dialog pour le motif de rejet */}
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
