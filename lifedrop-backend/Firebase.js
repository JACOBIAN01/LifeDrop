import admin from "firebase-admin";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error(
    "Missing GOOGLE_APPLICATION_CREDENTIALS environment variable"
  );
}

const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;
export { db, serverTimestamp };
