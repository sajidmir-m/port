import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { users } from '../shared/schema';

// Initialize SQLite database
const sqlite = new Database('portfolio.db');
export const db = drizzle(sqlite);

// Create tables if they don't exist
export function initializeDatabase() {
  try {
    // Create users table
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create portfolio_views table for analytics
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS portfolio_views (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_address TEXT,
        user_agent TEXT,
        page_path TEXT,
        viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create contact_submissions table
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Analytics functions
export function logPageView(ipAddress: string, userAgent: string, pagePath: string) {
  try {
    const stmt = sqlite.prepare(`
      INSERT INTO portfolio_views (ip_address, user_agent, page_path)
      VALUES (?, ?, ?)
    `);
    stmt.run(ipAddress, userAgent, pagePath);
  } catch (error) {
    console.error('Error logging page view:', error);
  }
}

export function getAnalytics() {
  try {
    const totalViews = sqlite.prepare('SELECT COUNT(*) as count FROM portfolio_views').get() as { count: number };
    const uniqueVisitors = sqlite.prepare('SELECT COUNT(DISTINCT ip_address) as count FROM portfolio_views').get() as { count: number };
    const recentViews = sqlite.prepare(`
      SELECT page_path, viewed_at 
      FROM portfolio_views 
      ORDER BY viewed_at DESC 
      LIMIT 10
    `).all();
    
    return {
      totalViews: totalViews.count,
      uniqueVisitors: uniqueVisitors.count,
      recentViews
    };
  } catch (error) {
    console.error('Error getting analytics:', error);
    return { totalViews: 0, uniqueVisitors: 0, recentViews: [] };
  }
}