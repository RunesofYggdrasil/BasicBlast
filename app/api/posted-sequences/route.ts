import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    const sequences = await prisma.sequence.findMany({
      where: {
        posted: true,
      },
    });
    return NextResponse.json({
      sequences,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};

export { GET };
