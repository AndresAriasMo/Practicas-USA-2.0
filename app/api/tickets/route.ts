import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: [], message: "Tickets" });
}

export async function POST() {
  return NextResponse.json({ message: "Ticket created" }, { status: 201 });
}
