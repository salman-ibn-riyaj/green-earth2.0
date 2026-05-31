import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  // Express সার্ভারে রিকোয়েস্ট ফরওয়ার্ড করা
  const res = await fetch("http://localhost:5000/api/update-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}