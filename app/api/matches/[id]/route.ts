import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
const path = "/api/matches/";

const GET = async (req: NextRequest) => {
  try {
    const idVal = parseInt(req.nextUrl.pathname.split(path)[1]);
    const match = await prisma.match.findFirst({
      where: { id: idVal },
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

const PUT = async (req: NextRequest) => {
  try {
    const res = await req.json();
    const idVal = parseInt(req.nextUrl.pathname.split(path)[1]);
    const duplicate = await prisma.match.findFirst({
      where: {
        NOT: {
          id: idVal,
        },
        queryID: res.queryID,
        subjectID: res.subjectID,
      },
    });
    if (duplicate) {
      return NextResponse.json({
        duplicate,
      });
    } else {
      const match = await prisma.match.update({
        data: {
          comparisonType: res.comparisonType,
          queryComparison: res.queryComparison,
          subjectComparison: res.subjectComparison,
          length: res.length,
          identities: res.identities,
          queryID: res.queryID,
          subjectID: res.subjectID,
        },
        where: { id: idVal },
      });
      return NextResponse.json({
        match,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};

const DELETE = async (req: NextRequest) => {
  try {
    const idVal = parseInt(req.nextUrl.pathname.split(path)[1]);
    const match = await prisma.match.delete({
      where: { id: idVal },
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

export { GET, PUT, DELETE };
