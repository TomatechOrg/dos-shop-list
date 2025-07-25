import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req:Request) {
    return NextResponse.json(await prisma.listItem.findMany({where:{count:{gt:0}}, orderBy:{name:'desc'}}));
}