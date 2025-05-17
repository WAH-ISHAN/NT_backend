import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
export function saveUser(req, res) {

    // Validate password presence before hashing
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

export function loginUser(req, res) {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({
		email: email,
	}).then((user) => {
		if (user == null) {
			res.status(404).json({
				message: "Invalid email",
			});
		} else {
			const isPasswordCorrect = bcrypt.compareSync(password, user.password);
			
			if (isPasswordCorrect) {
				
				const userData = {
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					 usertype: user. usertype,
					phone: user.phone,
					isDisabled: user.isDisabled,
					isEmailVerified: user.isEmailVerified
				}
				console.log(userData)

				const token = jwt.sign(userData,process.env.JWT_KEY,{
					expiresIn : "12hrs"
				})

				res.json({
					message: "Login successful",
					token: token,
					user : userData
				});


			} else {
				res.status(403).json({
					message: "Invalid password",
				});
				
			}
		}
	});
}