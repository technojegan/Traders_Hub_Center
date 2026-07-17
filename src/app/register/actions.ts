"use server";

import { prisma } from "@/lib/prisma";

export interface RegisterInput {
  name: string;
  phone: string;
  email: string | null;
}

export async function registerSubscriber(input: RegisterInput) {
  const name = input.name.trim();
  const phone = input.phone.trim();
  const email = input.email?.trim() || null;

  if (!name || !phone) {
    return { success: false, error: "Name and phone are required." };
  }

  // TODO(payments): once a paid tier exists, hook Razorpay/Stripe checkout in
  // here before persisting the subscriber as PREMIUM.
  await prisma.subscriber.create({
    data: { name, phone, email },
  });

  return { success: true };
}
