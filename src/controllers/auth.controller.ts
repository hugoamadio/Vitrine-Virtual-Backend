import { Request, Response } from "express";
import prisma from "../database/prisma.connection";
import hashUtils from "../utils/hashUtils";
import * as jwt from "jsonwebtoken"

class AuthController{
    public async login(req: Request, res: Response){
        const { email, password } = req.body

        if(!email || !password){
            res.status(401).json({success: false, msg: "Missing required fields"})
            return
        }

        try{
            const existingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if(!existingUser){
                res.status(404).json({success: false, msg: "User not foud"})
                return
            }

            const comparePass = await hashUtils.compareHash(password, existingUser?.password)

            if(!comparePass){
                res.status(400).json({success: false, msg: "Email or password are not valid"})
            }

            const token = jwt.sign({email: email}, process.env.JWT_SECRET || "", {
                expiresIn: '1h'
            })

            res.status(200).json({success: true, msg: "User logged", token})

        }catch(err:any){
            res.status(500).json({ success: false, msg: "Internal server error" });
            return
        }
    }
}

export default AuthController