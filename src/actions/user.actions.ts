"use server";

import { db } from "@/lib/db";
import { comparePassword, hashPassword } from "@/lib/hashing";

export async function createUser(
  name: string,
  email: string,
  password: string,
  role: string
) {

  let hashedPassword = hashPassword(password);
  password = hashedPassword;

  const user = await db.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });

  return user;
}

export async function approveUser(id: string) {
  const user = await db.user.update({
    where: {
      id,
    },
    data: { isRegistered: true },
  });

  return user;
}

export async function rejectUser(id: string) {
  const user = await db.user.delete({
    where: {
      id,
    },
  });

  return user;
}

export async function getEmail(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function login(email: string, password: string) {

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }
  if (comparePassword(password, user.password)) {
    return user;
  } else {
    return null;
  }
}