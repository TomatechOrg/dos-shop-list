import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req:Request) {
    if(req.bodyUsed){
        const { limit } = await req.json();

        if(typeof limit==='boolean' && limit){
            return NextResponse.json(await prisma.listItem.findMany({where:{count:{gt:0}}, orderBy:{name:'desc'}}));
        }
    }
    return NextResponse.json(await prisma.listItem.findMany({orderBy:{name:'desc'}}));
}

export async function POST(req:Request) {
    const { name } = await req.json();

    if(typeof name !== 'string')
    {
        return NextResponse.json(
            { error: "Provided itemName is missing or not a string" },
            { status: 400 }
        );
    }

    const existing = await prisma.listItem.findFirst({where:{name:name}});
    if(existing === null)
    {
        const newEntry = await prisma.listItem.create({data:{name:name, count:0}});
        return NextResponse.json(
            { 
                message: "Entry created",
                entry:newEntry
            }
        );
    }
    
    return NextResponse.json(
        { error: "Entry already exists" },
        { status: 400 }
    );
}