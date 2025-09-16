// import { useEffect, useRef } from "react";
// import { SendWhatsappMessage } from "../services/api";
// import { useAllRequests } from "./ManageRequest";
// import useDonorStatus from "./DonorStatus";
// import { useCurrentUser } from "../services/AuthService";


// export function useBloodAlerts() {
//    const { user, _ } = useCurrentUser();
//   const { requests } = useAllRequests();
//   const { isDonor, DonorData} = useDonorStatus();
//   const notifiedRequests = useRef(new Set());
//   const isInitialMount = useRef(true);

//   useEffect(() => {

//     if (!isDonor || !DonorData?.phone || !user?.uid) return;

//     // skip alerts on first load
//     if (isInitialMount.current) {
//       isInitialMount.current = false;
//       return;
//     }

//     (requests || []).forEach((req) => {
//       if (
//         req.bloodGroupNeeded === DonorData.bloodType &&
//         req.userId !== user.uid &&
//         !notifiedRequests.current.has(req.id)
//       ) {
//         notifiedRequests.current.add(req.id);

//         SendWhatsappMessage(
//           DonorData.phone,
//           `🚨 Urgent Blood Request 🚨\n\nA patient in *${
//             req.city || "your area"
//           }* needs *${
//             req.bloodGroupNeeded
//           }* blood.\n💉 Your donation can save a life today!\n❤️ Please confirm if available.`
//         );

//         console.log("WhatsApp alert sent for request:", req.id);
//       }
//     });
//   }, [requests, isDonor, DonorData?.phone, DonorData?.bloodType, user.uid]);
// }
