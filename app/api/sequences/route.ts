import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    const sequences = await prisma.sequence.findMany();
    return NextResponse.json({
      sequences,
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
    const sequence = await prisma.sequence.create({
      data: {
        name: res.name,
        species: res.species,
        brief: res.brief,
        description: res.description,
        sequence: res.sequence,
        posterID: res.posterID,
      },
    });
    return NextResponse.json({
      sequence,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};

export { GET, POST };
