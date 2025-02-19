import { FaGoogle } from "react-icons/fa";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLogin, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate, setIsLogin]); // ✅ Ye dependency zaroori hai


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsLogin(true);
      setUser(userCredential.user);
      setEmail(""); // Clear fields
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("User not found. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setIsLogin(true);
      setUser(result.user);
      navigate("/dashboard");
    } catch (error) {
      setError(`Google Login failed: ${error.message}`);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-semibold text-black mb-6">Welcome Back 👋</h2>

      {error && <p className="text-red-500 text-lg mb-3">{error}</p>}

      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
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
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-semibold">
          Signup
        </Link>
      </p>

      <div className="mt-6 flex flex-col items-center">
        <p className="text-gray-600 mb-2">Or </p>
        <button
          onClick={handleGoogleLogin}
          className="flex px-32 py-3 items-center bg-white shadow-md py-2 px-4 rounded-lg border border-gray-300 hover:border-orange-500 transition-all"
        >
          <FaGoogle />
          <span className="text-gray-700 font-semibold px-4"> &nbsp;Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
