import User from "../Models/User.js"
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { sendOTPEmail } from "../services/email.js"
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
 
export const checkIfUserExists = async(req, res) => {
  try {
    const {email} = req.body

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({message: "Valid email is required"})
    }

    const existingUser = await User.findOne({email})

    res.json({
      exists: !!existingUser
    })
  } catch(err) {
    console.error('Error checking user:', err)
    return res.status(500).json({message: "Server error"})
  }
}

  
export const registerUserAndRequestOTP = async (req, res) => {
  try {
    const { email, firstName, lastName, mobileNumber } = req.body

 
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({message: "Valid email is required"})
    }
    if (!firstName || !lastName) {
      return res.status(400).json({message: "First name and last name are required"})
    }

    
    let user = await User.findOne({ email })
    
    if (user) {
      return res.status(400).json({message: "User already exists. Please login."})
    }

   
    user = new User({
      email,
      firstName,
      lastName,
      mobileNumber
    })

    
    const otp = generateOTP()
    const hashedOtp = crypto
      .createHash("sha256") 
      .update(otp)
      .digest("hex")

    user.otp = hashedOtp
    user.expiresAt = new Date(Date.now() + 5 * 60 * 1000)
    await user.save()
        try {
      await sendOTPEmail(email, otp)
      // console.log(` OTP sent to: ${email}`)
      // console.log(` OTP (for dev): ${otp}`)  
    } catch (emailError) {
      console.error("Failed to send email:", emailError)
      // Delete the user if email fails
      await User.findByIdAndDelete(user._id)
      return res.status(500).json({ 
        message: "Failed to send OTP email. Please check your email address and try again." 
      })
    }

     
    // console.log("OTP for new user", email, ":", otp)

    res.status(201).json({ 
      message: "User created. OTP sent successfully"
    })
  } catch(err) {
    console.error('Register user error:', err)
    return res.status(500).json({message: "Server error"})
  }
}

 export const requestOTP = async (req, res) => {
  try {
    const { email } = req.body

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({message: "Valid email is required"})
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const otp = generateOTP()
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex")

    user.otp = hashedOtp
    user.expiresAt = new Date(Date.now() + 5 * 60 * 1000)
    await user.save()

      try {
      await sendOTPEmail(email, otp)
      // console.log(`OTP sent to: ${email}`)
      // console.log(` OTP (for dev): ${otp}`)  
    } catch (emailError) {
      console.error("Failed to send email:", emailError)
      return res.status(500).json({ 
        message: "Failed to send OTP email. Please try again." 
      })
    }

    //console.log("OTP for", email, ":", otp) Brooooooooooooooo am not leaking this

    res.json({ message: "OTP sent successfully" })
  } catch(err) {
    console.error('Request OTP error:', err)
    return res.status(500).json({message: "Server error"})
  }
}

export const verifyOTP = async (req, res) => {
  try {
    const {email, otp} = req.body

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({message: "Valid email is required"})
    }

    if (!otp || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({message: "Valid 6-digit OTP is required"})
    }

    const existingUser = await User.findOne({email})

    if(!existingUser || !existingUser.otp) {
      return res.status(400).json({message: "No OTP found. Please request a new one."})
    }

    if(existingUser.expiresAt < new Date()) {
      existingUser.otp = null
      existingUser.expiresAt = null
      await existingUser.save()
      return res.status(400).json({message: "OTP has expired. Please request a new one."})
    }

    const hashedOtp = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex')

    if(hashedOtp !== existingUser.otp) {
      return res.status(400).json({message: "Invalid OTP"})
    }

    existingUser.otp = null
    existingUser.expiresAt = null
    await existingUser.save()

    const token = jwt.sign(
      {id: existingUser._id}, 
      process.env.JWT_SECRET_KEY, 
      {expiresIn: '1d'}
    )
    
    res.json({ 
      token,
      user: {
        id: existingUser._id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        mobileNumber: existingUser.mobileNumber
      }
    })
  } catch(err) {
    console.error('Verify OTP error:', err)
    return res.status(500).json({message: "Server error"})
  }
}

 
export const updateUser = async(req, res) => {
  try {
    const userId = req.user.id
    const { firstName, lastName, mobileNumber } = req.body

    if (!firstName || !lastName) {
      return res.status(400).json({message: "First name and last name are required"})
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        mobileNumber
      },
      { new: true, runValidators: true }
    )

    if(!user) {
      return res.status(404).json({message: "User not found"})
    }

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber
      }
    })
  } catch(err) {
    console.error('Update user error:', err)
    return res.status(500).json({message: "Server error"})
  }
}

