// // hooks/useBloodRequestListener.js
// import { useEffect } from "react";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
// import { db } from "../services/firebase";
// import { SendWhatsappMessage } from "../services/api";

// export default function useBloodRequestListener(phone,bloodType) {
//   console.log("Blood Group Listener Running...: "+bloodType);
//   useEffect(() => {
//     if (!bloodType) return;

//     const q = query(
//       collection(db, "requests"),
//       where("bloodGroupNeeded", "==", bloodType)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           console.log("Added");
//            SendWhatsappMessage(phone,`Urgent Request: A patient needs ${bloodType} blood. Please respond if you can donate`);
//         }
//       });
//     });

//     return () => unsubscribe();
//   }, [bloodType,phone]);
// }
