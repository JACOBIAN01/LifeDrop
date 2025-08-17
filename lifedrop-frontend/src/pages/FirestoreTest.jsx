import React , {useState} from "react";     
// import { db } from "../services/firebase";
// import {
//   collection,
//   addDoc,
//   serverTimestamp,
//   Timestamp,
// } from "firebase/firestore";


export default function Test(){
    const [name,setName] = useState("");
    const [number,setNumber] = useState("");

   return (
     <>
       <div>
         <input
           placeholder="Enter Your Name"
           value={name}
           onChange={(e) => setName(e.target.value)}
         />
         <input
           placeholder="Enter Your Number"
           value={number}
           onChange={(e) => setNumber(e.target.value)}
         />
         <button>Submit</button>
       </div>
     </>
   );
}