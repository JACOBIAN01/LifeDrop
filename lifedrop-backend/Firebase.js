import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Ensure the environment variable is set
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error(
    "Missing GOOGLE_APPLICATION_CREDENTIALS environment variable"
  );
}

// Initialize Firebase Admin using Application Default Credentials
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();
const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;
db.settings({ ignoreUndefinedProperties: true });

export { db, serverTimestamp };
