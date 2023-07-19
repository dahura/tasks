import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  if (!user) {
    const error_response = {
      status: "fail",
      message: "No user with the Provided ID Found",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const json_response = {
    status: "success",
    data: {
      user,
    },
  };

  return NextResponse.json(json_response);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.delete({
    where: { id: Number(params.id) },
  });

  if (!user) {
    const error_response = {
      status: "fail",
      message: "No user with the Provided ID Found",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const json_response = {
    status: "success",
    data: {
      user,
    },
  };

  return NextResponse.json(json_response);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    let json = await request.json();

    const updated_feedback = await prisma.user.update({
      where: { id: Number(params.id) },
      data: json,
    });

    let json_response = {
      status: "success",
      data: {
        feedback: updated_feedback,
      },
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (error.code === "P2025") {
      let error_response = {
        status: "fail",
        message: "No User with the Provided ID Found",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
