// TODO: Create an interface for the Candidate objects returned by the API
// Candidate.interface.tsx

export interface Candidate {
    id: number;
    login: string;
    name: string | null;
    username: string;
    location: string | null;
    avatar_url: string;
    email: string | null;
    html_url: string;
    company: string | null;
  }
  