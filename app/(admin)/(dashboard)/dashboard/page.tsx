'use client'

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { saveVotingResults, addCandidate, removeCandidate, getCandidates } from "../actions"
import { Candidate, VotingResults } from "@/types/election"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 p-4 sm:p-8">
        <div className="container mx-auto py-8 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Saisie des Résultats Électoraux</h1>
            <p className="text-muted-foreground">
              Remplissez le formulaire ci-dessous avec les résultats du bureau de vote.
            </p>
          </div>


        </div>
      </div>
    </div>
  )
}

