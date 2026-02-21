import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App.jsx";

function ForgotPassword() {
  const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const borderColor = "#BFDBFE"; // or any color you want
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [err,setErr]=useState("")
    const [loading, setLoading] = useState(false);

    const handleSendOtp=async()=>{
      setLoading(true);
        try {
            const result=await axios.post(`${serverUrl}/api/auth/send-otp`,{email},{withCredentials:true})
            console.log(result)
            setErr("")
            setStep(2)
            setLoading(false);
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false);
        }
    }
    const handleResetPassword=async()=>{
      setLoading(true);
        if(newPassword!==confirmPassword){
            return null
        }
        try {

            const result=await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},{withCredentials:true})
            console.log(result)
            setErr("")
            navigate("/signin")
            setLoading(false);
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false);
        }
    }
    const handleVerifyOtp=async()=>{
      setLoading(true);
        try {
            const result=await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},{withCredentials:true})
            console.log(result)
            setErr("")
            setStep(3)
            setLoading(false);
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false);
        }
    }
  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6] ">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 ">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack size={30} className="text-[#ff4d2d] cursor-pointer" onClick={()=>navigate("/signin")} />
          <h1 className="text-3xl font-bold text-center text-[#ff4d2d] cursor-pointer" onClick={()=>navigate("/signin")}>
            Forgot Password
          </h1>
        </div>
        {step === 1 
        && 
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                placeholder="Enter your email"
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
             <button
          
          className={`w-full font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg py-2 px-4 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSendOtp}>
          Send OTP
        </button>
        {err && <p className="text-red-500 text-center">*{err}
       </p>}
          </div>
        }
        {step === 2 
        && 
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                OTP
              </label>
              <input type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                placeholder="Enter your OTP"
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
             <button
          
          className={`w-full font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg py-2 px-4 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}onClick={handleVerifyOtp} >
         Verify OTP
        </button>
        {err && <p className="text-red-500 text-center">*{err}
       </p> }
          </div>
        }

         {step === 3
        && 
          <div>  
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input type="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                placeholder="Enter New Password"
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input type="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                placeholder="Confirm Password"
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
             <button
          
          className={`w-full font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg py-2 px-4 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleResetPassword} disabled={loading}>
         {loading ? <ClipLoader size={20} color='white'/> : "Reset Password"}
        </button>
        {err && <p className="text-red-500 text-center">*{err}
       </p>}
       
          </div>
        }
      </div>
    </div>
  );
}
export default ForgotPassword;
