'use client';

import { useState } from "react";
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Step1 from "./Step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { Candidate, VotingResults } from "../../../../types/election";
import { v4 as uuidv4 } from 'uuid';

const MOCK_CANDIDATES: Candidate[] = [
  { id: '1', name: 'Paul Biya', party: 'Parti A' },
  { id: '2', name: 'Maurice Kamto', party: 'Parti B' },
  { id: '3', name: 'Cabral L', party: 'Parti C' },
];

export default function Page() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<VotingResults> & { pvImage?: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = (step / 3) * 100;

  const handleStep1Complete = (data: Pick<VotingResults, 'centerName' | 'department' | 'commune' | 'region'>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleStep2Complete = (data: Pick<VotingResults, 'registeredVoters' | 'actualVoters' | 'candidateVotes'>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleStep3Complete = (pvImage: string) => {
    setFormData(prev => ({
      ...prev,
      pvImage
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!formData.centerName || !formData.department || !formData.commune || !formData.region) {
        throw new Error('Informations du bureau incomplètes');
      }

      if (!formData.registeredVoters || !formData.actualVoters || !formData.candidateVotes) {
        throw new Error('Résultats du scrutin incomplets');
      }

      const finalData: VotingResults = {
        id: uuidv4(),
        centerName: formData.centerName,
        department: formData.department,
        commune: formData.commune,
        region: formData.region,
        registeredVoters: formData.registeredVoters,
        actualVoters: formData.actualVoters,
        candidateVotes: formData.candidateVotes,
        authenticated: false,
        openingTime: '08:00',
        closingTime: '18:00',
        electionType: 'présidentielle',
        bureauId: '1', // Ces valeurs devraient venir de l'API
        nullVotes: 0,
        blankVotes: 0,
      };

      const response = await fetch('/api/submit-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission des résultats');
      }

      window.location.href = '/results/success';
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-500">Étape {step} sur 3</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Informations du bureau</h2>
            <Step1 onDataComplete={handleStep1Complete} />
            <div className="flex justify-end mt-6">
              <Button onClick={() => setStep(2)}>
                Suivant
                <ChevronRightCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Résultats du scrutin</h2>
            <Step2 
              candidates={MOCK_CANDIDATES}
              onDataComplete={handleStep2Complete}
              initialData={formData}
            />
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ChevronLeftCircle className="mr-2 h-4 w-4" />
                Retour
              </Button>
              <Button onClick={() => setStep(3)}>
                Suivant
                <ChevronRightCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Photo du PV</h2>
            <Step3 
              onDataComplete={handleStep3Complete}
              initialData={formData.pvImage}
            />
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ChevronLeftCircle className="mr-2 h-4 w-4" />
                Retour
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? 'Envoi en cours...' : 'Soumettre les résultats'}
              </Button>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
