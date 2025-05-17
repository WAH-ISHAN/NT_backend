import express from 'express';
import { User } from '../Models/User.js';
import dotenv from 'dotenv';
import { toast } from 'toastify-js';
dotenv.config();

export function SaveUser(res,req){
    const Password =req.body.Password || req.body.Password;

    if(req.body.UserType === "Admin"){
        if(req.UserType == null){
            res.status(403).json({
                toast:
                {
                    message:"Please login as admin befpre creating an admin account"
                }
            })
            return;
        }
        if(req.UserType !== "Admin"){
            res.status(403).json({
                toast:
                {
                    message:"You are not authorized to create an admin account"
                }
            })
            return;
        }
    }

{/*       */}

        const user = new User({
            Email: req.body.Email,
            FristName: req.body.FristName,
            LastName: req.body.LastName,
            UserType: req.body.UserType,
            Password: Password,
            PhoneNumber: req.body.PhoneNumber
        })

        user.Save().then(() => {
                console.log("User saved successfully");
                res.json({
                    toast: { message: "User saved" }
                });
            }).catch((error) => {
                console.log("Error saving user", error);
                res.status(500).json({
                    toast: {
                        message: "Error saving user"
                    }
                });
            });


        }
export function LoginUser(req, res){
   
    const Email = req.body.Email;
    const Password = req.body.Password;

   User.findOne({ Email: Email, Password: Password })
    .then((user) => {
        console.log(user)
        if(user == null){
            res.status(404).json(
                {
                    toast: {
                        message: "User not found"
                    }
                })
            }else if(!user.Password){
                res.jsom({
                    toast: {
                        message: "Password is incorrect"
                    }
                })
            }else{
                const isPasswordCorrect = user.Password === Password;
                if(isPasswordCorrect){
                    const userData = {
                        Email: user.Email,
                        FristName: user.FristName,
                        LastName: user.LastName,
                        UserType: user.UserType,
                        PhoneNumber: user.PhoneNumber
                    }
                    
                }
                res.json({
                    toast: {
                        message: "User logged in successfully",
                        userData: userData
                    }
                })

    }
}).catch((error) => {
    res.status(500).json({
        toast: {
            message: "Error logging in user"
        }
    })
});
}