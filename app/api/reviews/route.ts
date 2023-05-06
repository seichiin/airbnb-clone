import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { content, listingId, rate } = body;

  const review = await prisma.review.create({
    data: {
      content,
      listingId,
      rate,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(review);
}
