import { Request, Response } from "express";
import prisma from "../database/prisma.connection";
import hashUtils from "../utils/hashUtils";

class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { name, lastName, cpf, email, birthDate, password, preference } =
        req.body;

      if (
        !name ||
        !lastName ||
        !cpf ||
        !email ||
        !birthDate ||
        !password ||
        !preference
      ) {
        res
          .status(400)
          .json({ success: false, msg: "Missing required fields" });
        return;
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{email}, {cpf}]
        }
      })

      if(existingUser){
        res.status(409).json({ success: false, msg: "Email or CPF already in use" });
        return;
      }

      const hashPass = await hashUtils.hashPass(password);

      const user = await prisma.user.create({
        data: {
          name,
          lastName,
          cpf,
          email,
          birthDate,
          password: hashPass,
          preference,
        },
      });

      if (user) {
        res.status(201).json({ success: true, msg: "User created" });
        return;
      }
    } catch (err: any) {
      res.status(500).json({ success: false, msg: "Internal server error" });
      return
    }
  }

  public async list(req: Request, res: Response){
    try{
      const users = await prisma.user.findMany()

      res.status(200).json({success: true, msg: "Users listing", users})
      return
    }catch(err: any){
      res.status(500).json({ success: false, msg: "Internal server error" });
      return
    }
  }

  public async update(req: Request, res: Response){
    const { id } = req.headers
    const { name, lastName, cpf, email, birthDate, password, preference } = req.body;

    if(typeof id !== `string`){
      res.status(400).json({success: false, msg: "Invalid user ID"})
      return
    }

    try{
      const user = await prisma.user.findUnique({
        where: {
          id: id as string
        }
      })

      if(!user){
        res.status(404).json({success: false, msg: "User not foud"})
        return
      }

      const existingUser = await prisma.user.findFirst({
        where:{
          OR: [{email}, {cpf}]
        }
      })

      if(existingUser){
        res.status(409).json({ success: false, msg: "Email or CPF already in use" });
        return;
      }

      const hashPass = password ? await hashUtils.hashPass(password) : user?.password

      const updateUser = await prisma.user.update({
        where:{
          id: id as string
        },
        data:{
          name,
          birthDate,
          cpf,
          email,
          lastName,
          password: hashPass,
          preference
        }
      })

      if(updateUser){
        res.status(200).json({success: true, msg: "User updated"})
        return
      }

      res.status(400).json({success: false, msg: "Error on updated user"})
      return
      
    } catch(err: any){
      res.status(500).json({ success: false, msg: "Internal server error" });
      return
    }
  }

  public async deleteUser(req: Request, res: Response){
    const { id } = req.headers

    if (!id) {
      res.status(400).json({ success: false, msg: "Id is required" });
      return
    }

    try{
      const existingUser = await prisma.user.findUnique({
        where: {
          id: id as string
        }
      })

      if(!existingUser){
        res.status(404).json({success: false, msg: "User not found"})
        return
      }

      await prisma.user.delete({
        where: {
          id: id as string
        }
      })

      res.status(200).json({success: true, msg: "User deleted"})
      return

    } catch(err:any) {
      res.status(500).json({ success: false, msg: "Internal server error" });
      return
    }
  }
}

export default UserController;
