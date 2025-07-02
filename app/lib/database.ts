import Database from "better-sqlite3";
import { join } from "path";

let db: Database.Database | null = null;

export function getDb() {
  if (!db) {
    const dbPath = join(process.cwd(), "seizy.db");
    db = new Database(dbPath);

    db.pragma("foreign_keys = ON");

    initializeTables();
  }

  return db;
}

function initializeTables() {
  if (!db) return;

  db.exec(`
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      species TEXT DEFAULT 'dog',
      breed TEXT,
      birth_date DATE,
      avatar_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
     )
   `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS seizures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('focal-aware', 'focal-impaired', 'absence', 'myoclonic', 'tonic', 'clonic', 'tonic-clonic', 'atonic')),
      date DATETIME NOT NULL,
      duration INTEGER NOT NULL,
      symptoms TEXT, -- JSON array as string?
      treatment TEXT, -- JSON array as string?
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE
     )
   `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_seizures_pet_id ON seizures(pet_id);
    CREATE INDEX IF NOT EXISTS idx_seizures_date ON seizures(date);
   `);
}

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
  type: 'focal-aware' | 'focal-impaired' | 'absence' | 'myoclonic' | 'tonic' | 'clonic' | 'tonic-clonic' | 'atonic';
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

export const serializeArray = (arr?: string[]) => arr ? JSON.stringify(arr) : null;
export const deserializeArray = (str?: string) => str ? JSON.parse(str) : [];