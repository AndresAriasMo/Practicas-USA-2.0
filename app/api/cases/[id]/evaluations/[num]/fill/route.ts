import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  { params }: { params: { id: string; num: string } }
) {
  return NextResponse.json({
    message: "Evaluation submitted",
    caseId: params.id,
    evaluationNumber: params.num
  });
}
