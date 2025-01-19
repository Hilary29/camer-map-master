"use server"

import { VotingResults } from "@/types/election"

export async function saveVotingResults(data: VotingResults) {
  // Validation des données
  const totalVotes = data.candidateVotes.reduce((sum, cv) => sum + cv.votes, 0)
  const totalVotesWithInvalid = totalVotes + data.nullVotes + data.blankVotes

  if (totalVotesWithInvalid !== data.actualVoters) {
    throw new Error("Le total des votes ne correspond pas au nombre de votants")
  }

  if (data.actualVoters > data.registeredVoters) {
    throw new Error("Le nombre de votants ne peut pas dépasser le nombre d'inscrits")
  }

  // Ici, vous ajouteriez la logique pour sauvegarder les données dans votre base de données
  console.log("Résultats sauvegardés:", data)

  // Simulons un délai pour l'exemple
  await new Promise(resolve => setTimeout(resolve, 1000))

  return { success: true }
}

