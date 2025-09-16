import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { register, useCurrentUser } from "../services/AuthService";
import { login } from "../services/AuthService";
import MessageBox from "../components/Alert";
import {useNavigate } from "react-router-dom";


// Sign In
function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {user,_} = useCurrentUser()
    useEffect(() => {
      if (user) {
        navigate("/dashboard");
      }
    }, [user, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
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
        disabled={isLoading}
        onClick={handleSignIn}
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

//Sign Up
function SignUpForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, _ } = useCurrentUser();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);


  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(name, "user", email, password);
      alert("User Registered Successfully!");
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4">
      <input
        onChange={(e) => setName(e.target.value)}
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
        disabled={isLoading}
        onClick={handleSignUp}
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
}

//Main Auth Component

export default function Auth({ status }) {
  const [isSignIn, setIsSignIn] = useState(status);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");


  // Use useEffect to handle prop changes if needed, though this is not required
  // for the initial render.
  useEffect(() => {
    setIsSignIn(status === "SignIN");
  }, [status]);

  const handleMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setMessage(""); // Clear message when toggling forms
  };



  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
            {isSignIn ? "Sign In to LifeDrop" : "Create Your LifeDrop Account"}
          </h2>

          <MessageBox
            message={message}
            type={messageType}
            onClose={() => setMessage("")}
          />

          {isSignIn ? (
            <SignInForm onMessage={handleMessage} />
          ) : (
            <SignUpForm onMessage={handleMessage} />
          )}

          {/* Toggle Link */}
          <p className="mt-4 text-center text-gray-600">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleForm}
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
