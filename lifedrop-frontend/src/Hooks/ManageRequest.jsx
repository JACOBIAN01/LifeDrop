import { useState, useEffect } from "react";
import { useCurrentUser } from "../services/AuthService";
import { db } from "../services/firebase";
import { collection, query, onSnapshot,where } from "firebase/firestore";

export function useRequest() {
  const { user, _ } = useCurrentUser();
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setRequestData([]);
      return;
    }

    try {
      // ✅ filter by UID
      const q = query(collection(db, "requests"), where("uid", "==", user.uid));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const reqs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRequestData(reqs);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching user requests:", err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up request query:", err);
      setError(err);
      setLoading(false);
    }
  }, [user]);

  return { requestData, loading, error };
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

