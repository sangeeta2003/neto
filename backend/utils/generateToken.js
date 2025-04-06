import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVar.js";

export const generateTokenAndCookies = (userId,res) =>{
const token = jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:'15d'});
res.cookie('jwt-netflix',token,{
    maxAge : 15 * 24 * 60 * 60 * 1000, 
    // 15 days in ms
    httpOnly : true,
    // prevent xss attack
    sameSite: "strict",
    // foregin attack
    secure : ENV_VARS.NODE_ENV !== "development"


});
return token;
}