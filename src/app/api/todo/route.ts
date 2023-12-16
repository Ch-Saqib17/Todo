import { db, todoTable } from "@/src/lib/drizzle";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

//GET
export async function GET(request: NextRequest) {
  try {
    sql`
    CREATE TABLE IF NOT EXISTS todos(
        id serial,
        task varchar(255)
    );
    `
    const res = await db.select().from(todoTable);

    return NextResponse.json({ data: res });
  } catch (err) {
    console.log((err as { message: string }).message);
    return NextResponse.json({ message: "Something went Wrong" });
  }
}
//POST
export async function POST(request: NextRequest) {
  const req = await request.json();

  try {
    if (req.task) {
      const res = await db
        .insert(todoTable)
        .values({ task: req.task })
        .returning();
      console.log(res);
      return NextResponse.json({ message: "Data added.", data: res });
    } else {
      throw new Error("Task Field is required");
    }
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}