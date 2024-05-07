import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  const users = await prisma.user.findMany();
  return NextResponse.json({
    users,
  });
};

const POST = async (req: NextRequest) => {
  const users = await prisma.user.findMany();
  return NextResponse.json({
    users,
  });
};

export { GET, POST };
