import prisma from "@/lib/prisma";
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

const PUT = async (req: NextRequest) => {
  try {
    const res = await req.json();
    const idVal = parseInt(req.nextUrl.pathname.split(path)[1]);
    const user = await prisma.user.update({
      data: {
        username: res.username,
        email: res.email,
        password: res.password,
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
