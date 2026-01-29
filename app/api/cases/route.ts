import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: [], message: "Cases list" });
}

export async function POST() {
  return NextResponse.json({ message: "Case created" }, { status: 201 });
}
