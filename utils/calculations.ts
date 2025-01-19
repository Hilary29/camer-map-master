import { VotingResults, AggregatedResults } from "@/types/election"

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Number(((value / total) * 100).toFixed(2))
}

export function aggregateResults(stations: VotingResults[]): AggregatedResults {
  const initial: AggregatedResults = {
    totalVotes: 0,
    nullVotes: 0,
    blankVotes: 0,
    registeredVoters: 0,
    actualVoters: 0,
    candidateVotes: {},
    candidatePercentages: {},
    participationRate: 0,
  }

  const results = stations.reduce((acc, station) => {
    // Agréger les votes de base
    acc.nullVotes += station.nullVotes
    acc.blankVotes += station.blankVotes
    acc.registeredVoters += station.registeredVoters
    acc.actualVoters += station.actualVoters

    // Agréger les votes des candidats
    station.candidateVotes.forEach(({ candidateId, votes }) => {
      acc.candidateVotes[candidateId] = (acc.candidateVotes[candidateId] || 0) + votes
    })

    return acc
  }, initial)

  // Calculer le total des votes valides
  results.totalVotes = Object.values(results.candidateVotes).reduce((sum, votes) => sum + votes, 0)

  // Calculer les pourcentages pour chaque candidat
  Object.entries(results.candidateVotes).forEach(([candidateId, votes]) => {
    results.candidatePercentages[candidateId] = calculatePercentage(votes, results.totalVotes)
  })

  // Calculer le taux de participation
  results.participationRate = calculatePercentage(results.actualVoters, results.registeredVoters)

  return results
}

// Fonction utilitaire pour valider les résultats d'un bureau de vote
export function validateVotingResults(results: VotingResults): string[] {
  const errors: string[] = []

  // Calculer le total des votes valides
  const totalValidVotes = results.candidateVotes.reduce((sum, cv) => sum + cv.votes, 0)
  
  // Calculer le total des votes (valides + nuls + blancs)
  const totalVotes = totalValidVotes + results.nullVotes + results.blankVotes

  // Vérifications
  if (totalVotes !== results.actualVoters) {
    errors.push("Le total des votes ne correspond pas au nombre de votants")
  }

  if (results.actualVoters > results.registeredVoters) {
    errors.push("Le nombre de votants ne peut pas dépasser le nombre d'inscrits")
  }

  if (results.nullVotes < 0) {
    errors.push("Le nombre de votes nuls ne peut pas être négatif")
  }

  if (results.blankVotes < 0) {
    errors.push("Le nombre de votes blancs ne peut pas être négatif")
  }

  results.candidateVotes.forEach(({ candidateId, votes }) => {
    if (votes < 0) {
      errors.push(`Le nombre de votes pour le candidat ${candidateId} ne peut pas être négatif`)
    }
  })

  return errors
}

// Fonction pour calculer les résultats par région
export function calculateRegionalResults(
  stations: VotingResults[],
  region: string
): AggregatedResults {
  const regionalStations = stations.filter(station => station.region === region)
  return aggregateResults(regionalStations)
}

// Fonction pour calculer les résultats par département
export function calculateDepartmentResults(
  stations: VotingResults[],
  department: string
): AggregatedResults {
  const departmentStations = stations.filter(station => station.department === department)
  return aggregateResults(departmentStations)
}

