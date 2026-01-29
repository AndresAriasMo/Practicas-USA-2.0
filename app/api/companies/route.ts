import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: [], message: "Companies" });
}

export async function POST() {
  return NextResponse.json({ message: "Company created" }, { status: 201 });
}
