import { useEffect, useState } from "react";
import { useCurrentUser } from "../services/AuthService";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [error,setError] = useState(null);
  const [loading , setLoading] = useState(true);
  const { user, _ } = useCurrentUser();

  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersSnap = await getDocs(usersRef);

        const userList = usersSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false)
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err)
        setLoading(false)
      }
    };

    fetchUsers();
  }, [user]);

  return {users,loading,error};
}
