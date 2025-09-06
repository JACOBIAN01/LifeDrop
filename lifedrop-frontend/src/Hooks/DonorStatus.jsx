import { useState,useEffect } from "react";
import { useCurrentUser } from "../services/AuthService";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";


export default function useDonorStatus() {
  const user = useCurrentUser();
  const [isDonor, setIsDonor] = useState(undefined);
  const [donorData, setDonorData] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchDonorData = async () => {
      try {
        const donorRef = doc(db, "donors", user.uid);
        const donorSnap = await getDoc(donorRef);
        if (donorSnap.exists()) {
          setIsDonor(true);
          setDonorData(donorSnap.data());
        } else {
          setIsDonor(false);
          setDonorData(null);
        }
      } catch (err) {
        console.error("Error fetching donor data:", err);
        setIsDonor(false);
        setDonorData(null);
      }
    };

    fetchDonorData();
  }, [user]);

  return { isDonor, donorData };
}

