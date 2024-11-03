import { Request, Response } from "express";
import prisma from "../database/prisma.connection";

class CategoryController{
    public async create(req: Request, res: Response){
        const { name } = req.body
        try{
            const existingCategory = await prisma.category.findUnique({
                where: {
                    name
                }
            })

            if(existingCategory){
                res.status(409).json({success: false, msg: "Category already exists"})
                return
            }

            const category = await prisma.category.create({
                data: {
                    name
                }
            })

            if(category){
                res.status(201).json({success: true, msg: "Category created"})
                return
            }

        } catch(err) {
            res.status(500).json({ success: false, msg: "Internal server error" });
            return;
        }
    }
}

export default CategoryController