import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

// API base URL (Vite): use `VITE_SERVER_URL` in a `.env` file or fallback to localhost
const serverUrl = "http://localhost:8000";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr]=useState("")
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setErr("")
      setLoading(false);
    } catch (error) {
       setErr(error?.response?.data?.message)
       setLoading(false);
    }
  };
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(data));
    } catch (error) {
      console.log("google auth error", error);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Snapeat
        </h1>
        <p className="text-gray-600 mb-8">
          Sign In To Your Account and Explore!!!
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email} required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter your password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password} required
            />

            {/* forgot pass */}
            <div className='text-right mb-4 text-[##ff4d2d] cursor-pointer font medium onClick={()=>navigate("/forgot-password")}>'>
              Forgot Password
            </div>
            {/* onchange used to access  */}

            <button
              type="button"
              className="absolute right-3 cursor-pointer top-10 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

         <button
          className={`w-full font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg py-2 px-4 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
          onClick={handleSignIn} disabled={loading} >
            {loading ? <ClipLoader size={20} color='white'/> : "Sign In"}
        </button>
        {err && <p className="text-red-500 text-center">*{err}
       </p>}
        <button
          className={`w-full font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg py-2 px-4 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
          onClick={handleGoogleAuth}>        
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want to create a new account?{" "}
          <span className="text-[#ff4d2d]">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
