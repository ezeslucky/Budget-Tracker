"use server"

import { currentUser } from "@clerk/nextjs/server";
import { CreateCategorySchema, CreateCategorySchemaType } from "../../../../schema/categories";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";



export async function  CreateCategory(form: CreateCategorySchemaType) {
    const  parsedBody =  CreateCategorySchema.safeParse(form)
    if(!parsedBody.success){
        throw new Error("bad request")

    }

    const user = await currentUser()
    if(!user){
        redirect("/sign-in")
    }
    const {name, icon,type} = parsedBody.data
    return await prisma.category.create({
        data:{
            userId: user.id,
            name,
            icon,
            type,
        }
    })
}