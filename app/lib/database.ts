import Database from "better-sqlite3";
import bcrypt from "bcrypt";
import { join } from "path";
import type { Pet, Seizure, SeizureWithPet, User } from "./types";

export const serializeArray = (arr?: string[]) =>
  arr ? JSON.stringify(arr) : null;
export const deserializeArray = (str?: string) => (str ? JSON.parse(str) : []);

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

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      name TEXT,
      status TEXT CHECK (status IN ('pending', 'active')) DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  try {
    db.exec(`ALTER TABLE pets ADD COLUMN user_id INTEGER REFERENCES users(id)`);
  } catch (error) {
    // an error means the alteration already exists, all is well, nothing to be done.
  }

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_pets_user_id ON pets(user_id);
  `);
}

export const petService = {
  create(pet: Omit<Pet, "id" | "created_at">) {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO pets (name, species, breed, birth_date, avatar_url)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      pet.name,
      pet.species,
      pet.breed,
      pet.birth_date,
      pet.avatar_url
    );
    return result.lastInsertRowid as number;
  },

  getAll(): Pet[] {
    const db = getDb();
    const stmt = db.prepare(`SELECT * FROM pets ORDER BY name`);
    return stmt.all() as Pet[];
  },

  getById(id: number): Pet | null {
    const db = getDb();
    const stmt = db.prepare(`SELECT * FROM pets WHERE id = ?`);
    return stmt.get(id) as Pet | null;
  },

  update(id: number, pet: Partial<Pet>) {
    const db = getDb();

    const fields = Object.keys(pet).filter(
      (key) => key !== "id" && key !== "created_at"
    );
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = fields.map((field) => pet[field as keyof Pet]);

    const stmt = db.prepare(`UPDATE pets SET ${setClause} WHERE id = ?`);
    return stmt.run(...values, id);
  },

  delete(id: number) {
    const db = getDb();
    const stmt = db.prepare("DELETE FROM pets WHERE id = ?");
    return stmt.run(id);
  },
};

export const seizureService = {
  create(seizure: Omit<Seizure, "id" | "created_at">) {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO seizures (pet_id, type, date, duration, symptoms, treatment, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      seizure.pet_id,
      seizure.type,
      seizure.date,
      seizure.duration,
      serializeArray(seizure.symptoms),
      serializeArray(seizure.treatment),
      seizure.notes
    );

    return result.lastInsertRowid as number;
  },

  getAll(): SeizureWithPet[] {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT s.*, p.name as pet_name
      FROM seizures s
      JOIN pets p ON s.pet_id = p.id
      ORDER BY s.date DESC
    `);

    const rows = stmt.all() as any[];
    return rows.map((row) => ({
      ...row,
      symptoms: deserializeArray(row.symptoms),
      treatment: deserializeArray(row.treatment),
    }));
  },

  getById(id: number): SeizureWithPet | null {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT s.*, p.name as pet_name
      FROM seizures s
      JOIN pets p ON s.pet_id = p.id
      WHERE s.id = ?      
    `);
    const row = stmt.get(id) as any;

    if (!row) return null;

    return {
      ...row,
      symptoms: deserializeArray(row.symptoms),
      treatment: deserializeArray(row.treatment),
    };
  },

  update(id: number, seizure: Partial<Seizure>) {
    const db = getDb();

    const fields = Object.keys(seizure).filter(
      (key) => key !== "id" && key !== "created_at"
    );
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = fields.map((field) => {
      const value = seizure[field as keyof Seizure];
      if (field === "symptoms" || field === "treatment") {
        return serializeArray(value as string[]);
      }
      return value;
    });
    const stmt = db.prepare(`UPDATE seizures SET ${setClause} WHERE id = ?`);
    return stmt.run(...values, id);
  },

  delete(id: number) {
    const db = getDb();
    const stmt = db.prepare("DELETE FROM seizures WHERE id = ?");
    return stmt.run(id);
  },
};

export const userService = {
  create(user: Omit<User, "id" | "created_at">) {
    const db = getDb();

    const stmt = db.prepare(`
      INSERT INTO users (email, password_hash, name, status)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(
      user.email,
      user.password_hash,
      user.name,
      user.status
    );
    return result.lastInsertRowid as number;
  },

  getByEmail(email: string): User | null {
    const db = getDb();

    const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
    return stmt.get(email) as User | null;
  },

  getById(id: number): User | null {
    const db = getDb();

    const stmt = db.prepare(`SELECT * FROM users WHERE id = ?`);
    return stmt.get(id) as User | null;
  },

  update(id: number, user: Partial<User>) {
    const db = getDb();

    const fields = Object.keys(user).filter(
      (key) => key !== "id" && key !== "created_at"
    );
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = fields.map((field) => user[field as keyof User]);
    const stmt = db.prepare(`UPDATE users SET ${setClause} WHERE id = ?`);

    return stmt.run(...values, id);
  },

  async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = this.getByEmail(email);
    if (!user || !user.password_hash) return null;

    const isValid = await bcrypt.compare(password, user.password_hash);

    return isValid ? user : null;
  },

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  },

  isEmailApproved(email: string): boolean {
    const user = this.getByEmail(email);
    return user !== null;
  },
};
