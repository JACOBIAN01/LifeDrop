import { useState,useEffect } from "react";
import { useCurrentUser } from "../services/AuthService";
import { db } from "../services/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";


export function useRequestStatus() {
  const user = useCurrentUser();
  const [RequestData, setRequestData] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchRequestData = async () => {
      try {
        const reqRef = doc(db, "requests", user.uid);
        const reqSnap = await getDoc(reqRef);
        if (reqSnap.exists()) {
          setRequestData(reqSnap.data());
        } else {
          setRequestData(null);
        }
      } catch (err) {
        console.error("Error fetching donor data:", err);
        setRequestData(null);
      }
    };
    fetchRequestData();
  }, [user]);
return RequestData;
}


export function useAllRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "requests"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const reqs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(reqs);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching requests:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  return { requests, loading, error };
}

