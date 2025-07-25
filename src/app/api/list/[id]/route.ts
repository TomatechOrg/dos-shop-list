import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req:Request, {params}:{params:Promise<{id:string}>}) {
    const { id } = await params;
    const intId = parseInt(id);
    if(Number.isNaN(intId))
    {
        return NextResponse.json(
            { error: "Provided entry id is not a number" },
            { status: 400 }
        );
    }
    
    const target = await prisma.listItem.findFirst({where:{id:intId}});
    return NextResponse.json(target);
}

export async function POST(req:Request, {params}:{params:Promise<{id:string}>}) {
    const { id } = await params;
    
    const intId = parseInt(id);
    if(Number.isNaN(intId))
    {
        return NextResponse.json(
            { error: "Provided id is missing or not a number" },
            { status: 400 }
        );
    }
    
    const target = await prisma.listItem.findFirst({where:{id:intId}});
    
    if(target === null)
    {
        return NextResponse.json(
            { error: "No entry exists with id"+intId },
            { status: 404 }
        );
    }

    
    const { count } = await req.json();
    if(typeof count !== 'number')
    {
        return NextResponse.json(
            { error: "Target count is not a number" },
            { status: 400 }
        );
    }

    if(count<0)
    {
        return NextResponse.json(
            { error: "Quantity cannot be less than 0" },
            { status: 400 }
        );
    }

    target.count = count;

    const updatedTarget = await prisma.listItem.update({
        where:{id:intId},
        data:target
    });
    
    if(updatedTarget !== null && updatedTarget.count==count)
    {
        return NextResponse.json(
            { 
                message: "Entry count updated",
                entry:updatedTarget
            }
        );
    }
    return NextResponse.json(
        { error: "Failed to update entry count" },
        { status: 500 }
    );
}

export async function DELETE(req:Request, {params}:{params:Promise<{id:string}>}) {
    const { id } = await params;
    const intId = parseInt(id);
    if(Number.isNaN(intId))
    {
        return NextResponse.json(
            { error: "Provided id is missing or not a number" },
            { status: 400 }
        );
    }
    
    const target = await prisma.listItem.findFirst({where:{id:intId}});
    
    if(target === null)
    {
        return NextResponse.json(
            { error: "No entry exists with id"+intId },
            { status: 404 }
        );
    }

    await prisma.listItem.delete({where:{id:intId}})
    
    const deletedTarget = await prisma.listItem.findFirst({where:{id:intId}});
    
    if(deletedTarget === null)
    {
        return NextResponse.json(
            { message: "Entry deleted" }
        );
    }
    return NextResponse.json(
        { error: "Failed to delete entry" },
        { status: 500 }
    );
}