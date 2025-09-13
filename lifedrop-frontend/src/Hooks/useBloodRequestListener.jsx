// hooks/useBloodRequestListener.js
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { SendWhatsappMessage } from "../services/api";

export default function useBloodRequestListener(bloodType) {
  useEffect(() => {
    if (!bloodType) return;

    const q = query(
      collection(db, "requests"),
      where("bloodType", "==", bloodType)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const request = change.doc.data();
           SendWhatsappMessage(request.phone,`Urgent Request: A patient needs ${request.bloodGroup} blood. Please respond if you can donate`);
        }
      });
    });

    return () => unsubscribe();
  }, [bloodType]);
}
