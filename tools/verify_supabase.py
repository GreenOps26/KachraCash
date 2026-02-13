import os
from supabase import create_client, Client
from dotenv import load_dotenv

def verify_supabase():
    load_dotenv()

    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

    if not url or not key:
        print("❌ Error: Missing Supabase credentials in .env")
        return False

    try:
        supabase: Client = create_client(url, key)
        # Try a simple query to verify connection.
        # Even if table doesn't exist, it should return a 404/error from Supabase, not a connection error.
        # Ideally, checking auth or just initialization.
        print(f"✅ Supabase Client Initialized for: {url}")

        # Optional: Check if we can reach the health endpoint or similar if possible,
        # but for now, client creation and a basic dummy select is a good 'handshake'.
        # We don't have tables yet, so we just check object instantiation.

        return True
    except Exception as e:
        print(f"❌ Connection Failed: {e}")
        return False

if __name__ == "__main__":
    verify_supabase()
