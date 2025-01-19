'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Candidate, CandidateVote, VotingResults } from "../../../types/election";

interface Step2Props {
  candidates: Candidate[];
  onDataComplete: (data: Pick<VotingResults, 'registeredVoters' | 'actualVoters' | 'candidateVotes'>) => void;
  initialData?: Partial<VotingResults>;
}

export default function Step2({ candidates, onDataComplete, initialData }: Step2Props) {
  const [formData, setFormData] = useState<Pick<VotingResults, 'registeredVoters' | 'actualVoters' | 'candidateVotes'>>({
    registeredVoters: initialData?.registeredVoters || 0,
    actualVoters: initialData?.actualVoters || 0,
    candidateVotes: initialData?.candidateVotes || candidates.map(c => ({
      candidateId: c.id,
      votes: 0
    }))
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateData = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.actualVoters > formData.registeredVoters) {
      newErrors.actualVoters = "Le nombre de votants ne peut pas dépasser le nombre d'inscrits";
    }

    const totalVotes = formData.candidateVotes.reduce((sum, cv) => sum + cv.votes, 0);

    if (totalVotes !== formData.actualVoters) {
      newErrors.total = "Le total des votes ne correspond pas au nombre de votants";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCandidateVotes = (candidateId: string, votes: number) => {
    setFormData(prev => ({
      ...prev,
      candidateVotes: prev.candidateVotes.map(cv =>
        cv.candidateId === candidateId ? { ...cv, votes } : cv
      )
    }));
  };

  const handleSubmit = () => {
    if (validateData()) {
      onDataComplete(formData);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Résultats du scrutin</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="registeredVoters">Inscrits</Label>
            <Input
              id="registeredVoters"
              type="number"
              min="0"
              value={formData.registeredVoters}
              onChange={(e) => handleInputChange('registeredVoters', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="actualVoters">Votants</Label>
            <Input
              id="actualVoters"
              type="number"
              min="0"
              value={formData.actualVoters}
              onChange={(e) => handleInputChange('actualVoters', parseInt(e.target.value) || 0)}
            />
            {errors.actualVoters && (
              <p className="text-sm text-red-500">{errors.actualVoters}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Résultats par candidat</h3>
          <div className="grid grid-cols-1 gap-4">
            {candidates.map(candidate => (
              <div key={candidate.id} className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label htmlFor={`candidate-${candidate.id}`}>
                    {candidate.name} ({candidate.party})
                  </Label>
                  <Input
                    id={`candidate-${candidate.id}`}
                    type="number"
                    min="0"
                    value={formData.candidateVotes.find(cv => cv.candidateId === candidate.id)?.votes || 0}
                    onChange={(e) => handleCandidateVotes(candidate.id, parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {errors.total && (
          <Alert variant="destructive">
            <AlertDescription>{errors.total}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}