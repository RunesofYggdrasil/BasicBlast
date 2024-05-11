import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    const matches = await prisma.match.findMany();
    return NextResponse.json({
      matches,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};

const POST = async (req: NextRequest) => {
  try {
    const res = await req.json();
    const match = await prisma.match.create({
      data: {
        queryComparison: res.queryComparison,
        subjectComparison: res.subjectComparison,
        length: res.length,
        identities: res.identities,
        queryID: res.queryID,
        subjectID: res.subjectID,
      },
    });
    return NextResponse.json({
      match,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};

const DELETE = async (req: NextRequest) => {
  try {
    const matches = await prisma.match.deleteMany();
    return NextResponse.json({
      matches,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};

export { GET, POST, DELETE };
