import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
// import jwt from "jsonwebtoken";

// User Register
export async function registerController(req,res){
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exists with this email or username",
            success : false,
            err : "User Already exists"
        })
    }


    const user = await userModel.create({
        username,
        email,
        password
    })


    // verification email

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
            <p> Hi ${username},</p>
            <p>Thank you for registering at <strong>Perplexity</strong>, We're excited to have you on board!</p>
            <p> Best regards, <br> The Perplexity Team</p>
        
        `
    })


    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

