"use server"

import { generateEmailBody, sendEmail } from "./generateEmail";


export async function sendToEmail(
  email: string,
  content: string,
  subject: string
) {
  await send(content, email, subject);
}

async function send(content: string, email: string, subject: string) {
  const emailBody = await generateEmailBody(content, subject);
  await sendEmail(emailBody, email);
}