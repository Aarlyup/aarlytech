export interface Grant {
  id: string;
  name: string;
  description: string;
  type: string;
  sector: string;
  amount: string;
  deadline?: string;
  dpiitRequired: boolean;
  website?: string;
  eligibility?: string[];
  documents?: string[];
  createdAt: string;
  updatedAt: string;
  organization: string;
  logo?: string;
}

export interface GrantCardProps {
  grant: Grant;
  onClick?: () => void;
} 