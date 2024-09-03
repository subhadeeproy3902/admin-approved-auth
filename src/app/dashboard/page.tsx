import { getEmail, notApprovedUsers } from "@/actions/user.actions";
import AdminCrud from "@/components/shared/AdminCrud";
import { getSession } from "@/lib/cookie";
import { MoveRight } from "lucide-react";
import { useEffect, useState } from 'react';

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export default async function Dashboard() {
  const session = await getSession();
  const email = session ? parseJwt(session).user.email : null;
  const checkEmail = await getEmail(email);
  const pendingUsers = await notApprovedUsers();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-3xl font-bold">
        Welcome, <span className="text-blue-500">{checkEmail?.name}</span>
      </h1>
      <h2>
        Your email is:{" "}
        <span className="text-blue-500">{checkEmail?.email}</span>
      </h2>
      <p>
        Your role is: <span className="text-blue-500">{checkEmail?.role}</span>
      </p>

      <h1 className="text-2xl font-semibold leading-none tracking-tight flex justify-start gap-4 items-center">
        Pending Approvals <MoveRight size={24} />
      </h1>

      {checkEmail?.role === "ADMIN" && (
        <div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingUsers.map((user) => (
              <AdminCrud key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
