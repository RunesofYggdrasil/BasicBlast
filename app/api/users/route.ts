import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  const users = await prisma.user.findMany();
  return NextResponse.json({
    users,
  });
};

const POST = async (req: NextRequest) => {
  try {
    const res = await req.json();
    const user = await prisma.user.create({
      data: {
        username: res.username,
        email: res.email,
        password: res.password,
      },
    });
    return NextResponse.json({
      user,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};

export { GET, POST };
