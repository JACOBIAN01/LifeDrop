import { useState, useEffect } from "react";
import { useCurrentUser } from "../services/AuthService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export function useOrgDetails() {
  const [orgDetails, setOrgDetails] = useState(null);
  const { user,_} = useCurrentUser();
  
  useEffect(() => {

    if (!user) {
      setOrgDetails(null);
      return;
    }
    const getDetails = async () => {
      try {
        const orgRef = doc(db, "organizations", user.uid);
        const orgSnap = await getDoc(orgRef);

        if (orgSnap.exists()) {
          setOrgDetails(orgSnap.data());
        } else {
          setOrgDetails(null);
        }
      } catch (err) {
        console.error(`Org Details Fetch Error: ${err}`);
      }
    };

    getDetails();
  }, [user]);

  return orgDetails;
}
