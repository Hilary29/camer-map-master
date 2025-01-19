export interface VotingCenterResult {
    centerName: string;
    bureauId: string;
    electionType: string;
  }
  
  export interface HeaderProps {
    userImage?: string;
  }
  
  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
  }
  
  