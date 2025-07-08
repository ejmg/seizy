export interface Pet {
  id?: number;
  name: string;
  species?: string;
  breed?: string;
  birth_date?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface Seizure {
  id?: number;
  pet_id: number;
  type:
    | "focal-aware"
    | "focal-impaired"
    | "absence"
    | "myoclonic"
    | "tonic"
    | "clonic"
    | "tonic-clonic"
    | "atonic";
  date: string;
  duration: number;
  symptoms?: string[];
  treatment?: string[];
  notes?: string;
  created_at?: string;
}

export interface SeizureWithPet extends Seizure {
  pet_name: string;
}
