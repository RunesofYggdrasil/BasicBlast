import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
const path = "/api/sequences/";

const GET = async (req: NextRequest) => {
  try {
    const idVal = parseInt(req.nextUrl.pathname.split(path)[1]);
    const sequence = await prisma.sequence.findMany({
      where: { id: idVal },
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

const PUT = async (req: NextRequest) => {
  try {
    const res = await req.json();
    const idVal = parseInt(req.nextUrl.pathname.split(path)[1]);
    const sequence = await prisma.sequence.update({
      data: {
        name: res.name,
        species: res.species,
        brief: res.brief,
        description: res.description,
        sequence: res.sequence,
        posted: res.posted,
        posterID: res.posterID,
      },
      where: { id: idVal },
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

const DELETE = async (req: NextRequest) => {
  try {
    const idVal = parseInt(req.nextUrl.pathname.split(path)[1]);
    const sequence = await prisma.sequence.delete({
      where: { id: idVal },
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

export { GET, PUT, DELETE };
