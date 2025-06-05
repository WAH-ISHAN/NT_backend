import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import nodemailer from "nodemailer";
import OTP from "../Models/Otp.js";

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.email,
		pass: process.env.GOOGLE_PASS_ID + process.env.password,
	},
});

dotenv.config()
export function saveUser(req, res) {

    
    if (!req.body.password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);


    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        usertype: req.body.usertype,
    });
	console.log(user);
    user.save()
        .then(() => {
            res.json({
                message: "User saved successfully",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "User not saved",
            });
        });
}

export async function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "Invalid email" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Invalid password" });
    }

    // ✅ Update last login time
    await User.updateOne(
      { email: user.email },
      { lastLoggedIn: new Date() }
    );

    const userData = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      usertype: user.usertype,
      phone: user.phone,
      isDisabled: user.isDisabled,
      isEmailVerified: user.isEmailVerified
    };

    const token = jwt.sign(userData, process.env.JWT_KEY, {
      expiresIn: "12h"
    });

    res.json({
      message: "Login successful",
      token: token,
      user: userData
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function googleLogin(){

	const accesstoken = req.body.accesstoken;

	try{
		const responce = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
			headers : {
				Authorization : "Bearer "+accesstoken
			}
		})

		const user = await User.findOne({
			email: responce.data.email
		})
		if(user == null){
			const newuser = new User({
				email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					usertype: user. usertype,
					phone: user.phone,
					password : accesstoken,
					isEmailVerified: true,
					
			})
			await newuser.save()
			const userData = {
					email: responce.data.email,
					firstName: responce.data.given_firstName,
					lastName: responce.data.given_lastName,
					 usertype: "user",
					phone: "not given",
					isDisabled: false,
					isEmailVerified: true
				}
				

				const token = jwt.sign(userData,process.env.JWT_KEY,{
					expiresIn : "12hrs"
				})

				res.json({
					message: "Login successful",
					token: token,
					user : userData
				});

		}else{
			const userData = {
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					 usertype: user. usertype,
					phone: user.phone,
					isDisabled: user.isDisabled,
					isEmailVerified: user.isEmailVerified
				}
				

				const token = jwt.sign(userData,process.env.JWT_KEY,{
					expiresIn : "12hrs"
				})

				res.json({
					message: "Login successful",
					token: token,
					user : userData
				});
		}


	}catch(e){
		res.status(500).json({
			message:"Google Login fail "
		})
	}
}
export  function sendOTP(req, res) {
	const email = req.body.email;
	const otp = Math.floor(100000 + Math.random() * 900000).toString();

	const message = {
		from: process.env.email,
		to: email,
		subject: "Your OTP Code",
		text: `Your OTP code is ${otp}`,
	};
	const newOtp = new OTP({
		email: email,
		otp: otp,
	});
	newOtp.save().then(() => {
		console.log("OTP saved successfully");
	}).catch((err) => {
		console.log("Error saving OTP:", err);
		return res.status(500).json({
			message: "Error saving OTP",
		});
	});
	transporter.sendMail(message, (error, info) => {
		if (error) {
			return res.status(500).json({
				message: "Error sending OTP",
			});
		}
		
		req.session.otp = otp;
		req.session.email = email; 
		res.json({
			message: "OTP sent successfully",
			otp: otp, 
		});
	});	
}
export async function changePassword(req,res){
	const email = req.body.email;
	const password = req.body.password;
	const otp = req.body.otp;
	try{
		
		const lastOTPData = await OTP.findOne({
			email : email
		}).sort({createdAt : -1})

		if(lastOTPData == null){
			res.status(404).json({
				message : "No OTP found for this email"
			})
			return;
		}
		if(lastOTPData.otp != otp){
			res.status(403).json({
				message : "Invalid OTP"
			})
			return;
		}

		const hashedPassword = bcrypt.hashSync(password, 10);
		await User.updateOne({
			email : email
		},{
			password : hashedPassword
		})
		await OTP.deleteMany({
			email : email
		})
		res.json({
			message : "Password changed successfully"
		})

		

	}catch(e){
		res.status(500).json({
			message : "Error changing password"
		})
	}
	

}
export async function getAllUsers(req, res) {
	try {
		const users = await User.find({});
		res.status(200).json({
			message: "All users fetched successfully",
			users: users
		});
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({
			message: "Error fetching users",
		});
	}
}

