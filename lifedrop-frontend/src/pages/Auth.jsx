import { useState , useEffect } from "react";
import Navbar from "../components/Navbar";
import { register } from "../services/AuthService";
import { login } from "../services/AuthService";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";


// Sign In
function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Logged in Successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="space-y-4">
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <button
        onClick={handleSignIn}
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        Sign In
      </button>
    </form>
  );
}

//Sign Up
function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert("User Registered Successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <button
        onClick={handleSignUp}
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        Sign Up
      </button>
    </form>
  );
}



//Main Auth Component
export default function Auth() {

  const [user , setUser] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
    });
    return ()=>unsubscribe();
  })


  return (
    <>
      <Navbar user={user}/>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
            {isSignIn ? "Sign In to LifeDrop" : "Create Your LifeDrop Account"}
          </h2>

          {isSignIn ? <SignInForm /> : <SignUpForm />}

          {/* Toggle Link */}
          <p className="mt-4 text-center text-gray-600">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-red-500 font-semibold hover:underline"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

