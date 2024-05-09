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
        comp: res.comp,
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

export { GET, POST };