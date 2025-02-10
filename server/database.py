from flask import Flask
from dotenv import load_dotenv
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")


def get_db_connection():
    import psycopg2
    from psycopg2.extras import RealDictCursor
    import os

    DATABASE_URL = os.getenv("DATABASE_URL")
    try:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None