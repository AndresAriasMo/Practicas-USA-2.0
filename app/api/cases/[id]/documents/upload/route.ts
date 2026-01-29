import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    message: "Document uploaded",
    caseId: params.id
  });
}
