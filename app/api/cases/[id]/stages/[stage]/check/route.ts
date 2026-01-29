import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  { params }: { params: { id: string; stage: string } }
) {
  return NextResponse.json({
    message: "Stage check recorded",
    caseId: params.id,
    stage: params.stage
  });
}
