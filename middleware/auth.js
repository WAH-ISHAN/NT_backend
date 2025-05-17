import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
//meya middleware ekk()next() kiyla call karanawa next ekk call karanwa nisa meya middleware ekk
//middleware ekk kiyanne api ekk walata yanna ona nisa meya use karanawa
export default function verifyjwt(req, res, next) {

    const header = req.headers["authorization"];
    if (header != null) {
        const token = header.replace("Bearer ", "");

        //code eka decode krnnawa mehema
        jwt.verify(token, process.env.JWT_SKEY, (err, decoded) => {
            if (decoded != null) {
                req.user = decoded;
            }
            else {
                res.status(403).json({
                    message: "unauthorized"
                })
            }

        })
    }
    next();
}