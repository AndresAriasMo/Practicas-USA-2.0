import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: [], message: "Vacancies" });
}

export async function POST() {
  return NextResponse.json({ message: "Vacancy created" }, { status: 201 });
}
