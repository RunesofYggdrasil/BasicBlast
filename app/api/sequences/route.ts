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
    const duplicate = await prisma.sequence.findFirst({
      where: {
        sequence: res.sequence,
        posted: res.posted,
      },
    });
    if (duplicate) {
      return NextResponse.json({
        duplicate,
      });
    } else {
      if ((res.posted && !res.posterID) || (!res.posted && res.posterID)) {
        throw new Error(
          "Invalid Input: Posted Posts Require Poster and Unposted Posts Prohibit Poster"
        );
      } else {
        const sequence = await prisma.sequence.create({
          data: {
            name: res.name,
            species: res.species,
            brief: res.brief,
            description: res.description,
            sequence: res.sequence,
            posted: res.posted,
            posterID: res.posterID,
          },
        });
        return NextResponse.json({
          sequence,
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};

const DELETE = async (req: NextRequest) => {
  try {
    const sequences = await prisma.sequence.deleteMany();
    return NextResponse.json({
      sequences,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};

export { GET, POST, DELETE };
