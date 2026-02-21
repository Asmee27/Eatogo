import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import genToken from '../utils/token.js'
import { sendOtpMail } from '../utils/mail.js'

/* ========================= SIGN UP ========================= */

export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body

        console.log("REQ BODY:", req.body) // Debug log

        // Check required fields
        if (!fullName || !email || !password || !mobile || !role) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        // Validate mobile
        if (mobile.length < 10) {
            return res.status(400).json({ message: "Mobile number must be at least 10 digits" })
        }

        // Check existing user
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        user = await User.create({
            fullName,
            email,
            role,
            mobile,
            password: hashedPassword
        })

        // Generate token
        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(user)

    } catch (error) {
        console.log("SIGNUP ERROR:", error)
        return res.status(500).json({ message: "Sign up server error" })
    }
}


/* ========================= SIGN IN ========================= */

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user)

    } catch (error) {
        console.log("SIGNIN ERROR:", error)
        return res.status(500).json({ message: "Sign in server error" })
    }
}


/* ========================= SIGN OUT ========================= */

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Signout successful" })
    } catch (error) {
        console.log("SIGNOUT ERROR:", error)
        return res.status(500).json({ message: "Sign out server error" })
    }
}


/* ========================= SEND OTP ========================= */

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ message: "Email required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist." })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false

        await user.save()
        await sendOtpMail(email, otp)

        return res.status(200).json({ message: "OTP sent successfully" })

    } catch (error) {
        console.log("SEND OTP ERROR:", error)
        return res.status(500).json({ message: "Send OTP server error" })
    }
}


/* ========================= VERIFY OTP ========================= */

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP required" })
        }

        const user = await User.findOne({ email })

        if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" })
        }

        user.resetOtp = undefined
        user.isOtpVerified = true
        user.otpExpires = undefined

        await user.save()

        return res.status(200).json({ message: "OTP verified successfully" })

    } catch (error) {
        console.log("VERIFY OTP ERROR:", error)
        return res.status(500).json({ message: "Verify OTP server error" })
    }
}


/* ========================= RESET PASSWORD ========================= */

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body

        if (!email || !newPassword) {
            return res.status(400).json({ message: "Email and new password required" })
        }

        const user = await User.findOne({ email })

        if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "OTP verification required." })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.isOtpVerified = false

        await user.save()

        return res.status(200).json({ message: "Password reset successfully" })

    } catch (error) {
        console.log("RESET PASSWORD ERROR:", error)
        return res.status(500).json({ message: "Reset password server error" })
    }
}


/* ========================= GOOGLE AUTH ========================= */

export const googleAuth = async (req, res) => {
    try {
        const { email, fullName, mobile, role } = req.body

        if (!email || !fullName) {
            return res.status(400).json({ message: "Google auth data missing" })
        }

        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({
                fullName,
                email,
                mobile,
                role
            })
        }

        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user)

    } catch (error) {
        console.log("GOOGLE AUTH ERROR:", error)
        return res.status(500).json({ message: "Google auth server error" })
    }
}