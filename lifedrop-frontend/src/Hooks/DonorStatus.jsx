import { useState, useEffect } from "react";
import { useCurrentUser } from "../services/AuthService";
import { db } from "../services/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function useDonorStatus() {
  const { user, _ } = useCurrentUser();
  const [isDonor, setIsDonor] = useState(false);
  const [donorData, setDonorData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (!user) {
      setIsDonor(false);
      setLoading(false);
      return;
    }

    const fetchDonorData = async () => {
      setLoading(true);
      try {
        const donorRef = doc(db, "donors", user.uid);
        const donorSnap = await getDoc(donorRef);
        if (donorSnap.exists()) {
          setLoading(false);
          setIsDonor(true);
          setDonorData(donorSnap.data());
        } else {
          setLoading(false);
          setIsDonor(false);
          setDonorData(null);
        }
      } catch (err) {
        setLoading(false);
        console.error("Error fetching donor data:", err);
        setIsDonor(false);
        setDonorData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDonorData();
  }, [user]);

  return { isDonor, loading, donorData };
}

export function useAllDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const donorsRef = collection(db, "donors");
        const donorSnap = await getDocs(donorsRef);
        const donorList = donorSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDonors(donorList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching all donors:", err);
        setError(err);
        setLoading(false);
        setDonors([]);
      }
    };

    fetchDonors();
  }, []);

  return { donors, loading, error };
}
