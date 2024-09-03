import { getEmail } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import { getSession, logout } from "@/lib/cookie";

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
    </main>
  );
}
