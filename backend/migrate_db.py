"""
Migrate database to add video_url, thumbnail, instructor, video_urls_multilang, available_languages, and stream columns
"""
import sqlite3
import os

# Database path
DB_PATH = 'instance/learnhub.db'

def migrate():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Add new columns if they don't exist
    try:
        cursor.execute("ALTER TABLE courses ADD COLUMN video_url TEXT")
        print("✅ Added video_url column")
    except sqlite3.OperationalError:
        print("⚠️  video_url column already exists")
    
    try:
        cursor.execute("ALTER TABLE courses ADD COLUMN thumbnail TEXT")
        print("✅ Added thumbnail column")
    except sqlite3.OperationalError:
        print("⚠️  thumbnail column already exists")
    
    try:
        cursor.execute("ALTER TABLE courses ADD COLUMN instructor TEXT")
        print("✅ Added instructor column")
    except sqlite3.OperationalError:
        print("⚠️  instructor column already exists")
    
    try:
        cursor.execute("ALTER TABLE courses ADD COLUMN video_urls_multilang TEXT DEFAULT '{}'")
        print("✅ Added video_urls_multilang column")
    except sqlite3.OperationalError:
        print("⚠️  video_urls_multilang column already exists")
    
    try:
        cursor.execute("ALTER TABLE courses ADD COLUMN available_languages TEXT DEFAULT '[\"en\"]'")
        print("✅ Added available_languages column")
    except sqlite3.OperationalError:
        print("⚠️  available_languages column already exists")
    
    try:
        cursor.execute("ALTER TABLE courses ADD COLUMN stream TEXT DEFAULT 'general'")
        print("✅ Added stream column to courses")
    except sqlite3.OperationalError:
        print("⚠️  stream column already exists in courses")
    
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN stream TEXT DEFAULT 'general'")
        print("✅ Added stream column to users")
    except sqlite3.OperationalError:
        print("⚠️  stream column already exists in users")
    
    conn.commit()
    conn.close()
    print("\n✅ Migration completed successfully!")

if __name__ == "__main__":
    if not os.path.exists(DB_PATH):
        print("❌ Database file not found. Please run the app first to create it.")
    else:
        migrate()
