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
    // Simuler un délai de chargement de 1 seconde
    const timeout = setTimeout(() => {
      const mockData: BureauInfoResponse = {
        centerName: "Bureau Central de Dakar-Plateau",
        region: "Dakar",
        department: "Dakar",
        commune: "Plateau"
      };
      
      setBureauInfo(mockData);
      onDataComplete(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
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
        <CardTitle>Informations </CardTitle>
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