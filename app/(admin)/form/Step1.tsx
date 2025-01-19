'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { VotingResults } from "../../../types/election";

type BureauInfoResponse = Pick<VotingResults, 'centerName' | 'department' | 'commune' | 'region'>;

interface Step1Props {
  onDataComplete: (data: Pick<VotingResults, 'centerName' | 'department' | 'commune' | 'region'>) => void;
}

export default function Step1({ onDataComplete }: Step1Props) {
  const [bureauInfo, setBureauInfo] = useState<BureauInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBureauInfo = async () => {
      try {
        const response = await fetch('http://192.168.10.24/api/data', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des informations du bureau");
        }

        const data: BureauInfoResponse = await response.json();
        setBureauInfo(data);
        onDataComplete(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchBureauInfo();
  }, [onDataComplete]);

  if (loading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-3/4" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Informations du bureau de vote</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Bureau de vote</p>
            <p className="font-medium">{bureauInfo?.centerName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Région</p>
            <p className="font-medium">{bureauInfo?.region}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Département</p>
            <p className="font-medium">{bureauInfo?.department}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Commune</p>
            <p className="font-medium">{bureauInfo?.commune}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

