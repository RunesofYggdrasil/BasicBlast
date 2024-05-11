import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
const path = "/api/users/";

const GET = async (req: NextRequest) => {
  try {
    const idVal = parseInt(req.nextUrl.pathname.split(path)[1]);
    const user = await prisma.user.findMany({
      where: { id: idVal },
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

// Encrypt Password
const PUT = async (req: NextRequest) => {
  try {
    const res = await req.json();
    const hashedPassword = await bcrypt.hash(res.password, 10);
    const idVal = parseInt(req.nextUrl.pathname.split(path)[1]);
    const user = await prisma.user.update({
      data: {
        username: res.username,
        email: res.email,
        password: hashedPassword,
      },
      where: { id: idVal },
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
    const idVal = parseInt(req.nextUrl.pathname.split(path)[1]);
    const user = await prisma.user.delete({
      where: { id: idVal },
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

export { GET, PUT, DELETE };
