import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import papaparse from "papaparse";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  const csvData = papaparse.unparse(users);
  const headers = new Headers();
  headers.append("Content-Type", "text/csv");
  headers.append("Content-Disposition", "attachment; filename=users.csv");

  const response = new NextResponse(csvData, {
    status: 200,
    headers,
  });

  return response;
}

export async function POST(request: Request, {}) {
  try {
    const json = await request.json();
    const user = await prisma.user.create({ data: json });

    let json_response = {
      status: "success",
      data: {
        user,
      },
    };
    return new NextResponse(JSON.stringify(json_response));
  } catch (error: any) {
    if (error.code === "P2002") {
      let error_response = {
        status: "fail",
        message: "user  already exists",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
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
