'use server'

import { Candidate, VotingResults } from "@/types/election"

// Simulated database operations
let candidatesDb: Candidate[] = []
let currentId = 0

export async function saveVotingResults(data: VotingResults) {
  console.log('Saving voting results:', data)
  // Implement your saving logic here
}

export async function addCandidate(candidate: Omit<Candidate, "id">) {
  const newCandidate = {
    ...candidate,
    id: String(++currentId)
  }
  candidatesDb.push(newCandidate)
  return newCandidate
}

export async function removeCandidate(id: string) {
  candidatesDb = candidatesDb.filter(candidate => candidate.id !== id)
}

export async function getCandidates() {
  return candidatesDb
}

