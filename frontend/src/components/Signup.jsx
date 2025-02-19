import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

const Signup = ({ setIsLogin, setUser }) => { // ✅ setUser as prop receive kiya
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // ✅ Name input added
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name }); // ✅ Name set karna
      setIsLogin(true);
      setUser(userCredential.user); // ✅ User ko state me dalna
      navigate("/dashboard");
    } catch (error) {
      setError("Signup failed. Try again.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setIsLogin(true);
      setUser(result.user);
      navigate("/dashboard");
    } catch (error) {
      setError("Google Signup failed.");
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-semibold text-black mb-6">Create Your Account 🚀</h2>

      {error && <p className="text-red-500 text-lg mb-3">{error}</p>}

      <form onSubmit={handleSignup} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-4 rounded-lg bg-white shadow-md text-black border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-4 rounded-lg bg-white shadow-md text-black border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-4 rounded-lg bg-white shadow-md text-black border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
        />
        <button
          type="submit"
          className="w-full p-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all"
        >
          Signup
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-orange-500 hover:text-orange-600 font-semibold">
          Login
        </a>
      </p>

      <div className="mt-6 flex flex-col items-center">
        <p className="text-gray-600 mb-2">Or</p>
        <button
          onClick={handleGoogleSignup}
          className="flex px-32 py-3 items-center bg-white shadow-md py-2 px-4 rounded-lg border border-gray-300 hover:border-orange-500 transition-all"
        >
          <FaGoogle />
          <span className="text-gray-700 font-semibold px-4"> &nbsp;Signup with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
