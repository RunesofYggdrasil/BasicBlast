import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({
      users,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};

// Encrypt Password
const POST = async (req: NextRequest) => {
  try {
    const res = await req.json();
    const hashedPassword = await bcrypt.hash(res.password, 10);
    const user = await prisma.user.create({
      data: {
        username: res.username,
        email: res.email,
        password: hashedPassword,
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

const DELETE = async (req: NextRequest) => {
  try {
    const users = await prisma.user.deleteMany();
    return NextResponse.json({
      users,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};

export { GET, POST, DELETE };
