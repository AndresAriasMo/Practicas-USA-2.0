import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: [], message: "Announcements" });
}

export async function POST() {
  return NextResponse.json({ message: "Announcement created" }, { status: 201 });
}
