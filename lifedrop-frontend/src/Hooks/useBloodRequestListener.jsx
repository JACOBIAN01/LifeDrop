// hooks/useBloodRequestListener.js
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import {SendWhatsappMessage} from "../services/api"
import { useCurrentUser } from "../services/AuthService";
import useDonorStatus from "./DonorStatus";


const useBloodRequestListener = () => {
    const user = useCurrentUser()
    const [isDonor,DonorData] = useDonorStatus()
  useEffect(() => {
    if (!user && !isDonor) return;
    const unsub = onSnapshot(collection(db, "bloodRequests"), (snap) => {
      snap.docChanges().forEach((change) => {
        if (change.type === "added") {
          const { bloodGroup, phone } = change.doc.data();
          if (bloodGroup === DonorData.bloodType) {
          SendWhatsappMessage(phone,`Urgent: ${bloodGroup} blood is needed. Please help if you can.`,
          );
          }
        }
      });
    });
    return () => unsub();
  }, [DonorData,isDonor,user]);
};
export default useBloodRequestListener;
