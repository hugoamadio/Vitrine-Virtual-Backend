import { Request, Response } from "express";
import prisma from "../database/prisma.connection";


class CategoryController{
    public async create(req: Request, res: Response){
        const { name, gender } = req.body     
        if (!name || !gender) {
            res.status(400).json({ success: false, msg: "Missing required fields: 'name' and 'gender'" })
            return
        }
        
        try{
            const existingCategory = await prisma.category.findUnique({
                where: { 
                    name,
                    gender
                }
            })
            
            if(existingCategory){
                res.status(409).json({success: false, msg: "Category already exists"})
                return
            }
            
            const category = await prisma.category.create({
                data: {
                    name,
                    gender
                }
            })
            
            if(category){
                res.status(201).json({success: true, msg: "Category created"})
                return
            }

        } catch(err) {
            console.error(err)
            res.status(500).json({ success: false, msg: "Internal server error" });
            return;
        }
    }

    public async list(req: Request, res: Response){
        try{
            const category = await prisma.category.findMany()

            if(category){
                res.status(200).json({success: true, msg:"Category listing", category})
                return
            }

            res.status(400).json({success: false, msg: "Erro in listing category"})
            return

        } catch(err){
            res.status(500).json({ success: false, msg: "Internal server error" });
            return; 
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.headers;
        const { name, gender } = req.body;

        if (!id) {
            res.status(400).json({ success: false, msg: "Id is required" });
            return
        }
    
        try {
            const existingCategory = await prisma.category.findUnique({
                where: { id: id as string }
            });
    
            if (!existingCategory) {
                res.status(404).json({ success: false, msg: "Category not found" });
                return
            }
    
            const duplicateCategory = await prisma.category.findFirst({
                where: {
                    name,
                    NOT: {
                        id: id as string
                    }
                }
            });
    
            if (duplicateCategory) {
                res.status(409).json({ success: false, msg: "Category name already exists" });
                return
            }
    
            await prisma.category.update({
                where: { id: id as string },
                data: {
                    name,
                    gender
                }
            });
    
            res.status(200).json({ success: true, msg: "Category updated" });
            return
    
        } catch (err) {
            res.status(500).json({ success: false, msg: "Internal server error" });
            return
        }
    }

    public async delete(req: Request, res: Response){
        const { id } = req.headers

        if (!id) {
            res.status(400).json({ success: false, msg: "Id is required" });
            return
        }

        try{
            const existingCategory = await prisma.category.findFirst({
                where: {id: id as string}
            })

            if(!existingCategory){
                res.status(404).json({success: false, msg: "Category not found"})
            }

            await prisma.category.delete({
                where: {id: id as string}
            })

            res.status(200).json({success: true, msg: "Category deleted"})
            return
        }catch(err){
            res.status(500).json({ success: false, msg: "Internal server error" });
            return
        }
    }
    
}

export default CategoryController