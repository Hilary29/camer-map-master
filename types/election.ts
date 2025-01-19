export interface Candidate {
  id: string
  name: string
  party: string
}

export interface CandidateVote {
  candidateId: string
  votes: number
}

export interface VotingResults {
  id: string;
  region: string;
  department: string;
  commune: string;
  openingTime: string;
  closingTime: string;
  registeredVoters: number;
  actualVoters: number;
  nullVotes: number;
  blankVotes: number;
  authenticated: boolean;
  centerName: string;
  bureauId: string;
  electionType: string;
  candidateVotes: {
    candidateId: string;
    votes: number;
  }[];
}
  

  
  export interface AggregatedResults {
    totalVotes: number
    nullVotes: number
    blankVotes: number
    registeredVoters: number
    actualVoters: number
    candidateVotes: Record<string, number>
    candidatePercentages: Record<string, number>
    participationRate: number
  }
  
  export interface VotingStationFormProps {
    candidates: Candidate[]
    onSubmit: (data: VotingResults) => Promise<void>
    onAddCandidate: (candidate: Omit<Candidate, "id">) => Promise<void>
    onRemoveCandidate: (id: string) => Promise<void>
    disabled?: boolean
  }
  
  