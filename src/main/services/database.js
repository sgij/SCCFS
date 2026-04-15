import Database from 'better-sqlite3';
import path from 'path';

let db = null;

export function initDatabase(userDataPath) {
  const dbPath = path.join(userDataPath, 'database.sqlite3');
  db = new Database(dbPath);

  db.pragma('journal_mode = WAL');
  db.pragma('synchronous = NORMAL');
  db.pragma('foreign_keys = ON');
  db.pragma('busy_timeout = 5000');

  db.exec(`
    CREATE TABLE IF NOT EXISTS app_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);

  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Database is not initialized');
  }
  return db;
}
