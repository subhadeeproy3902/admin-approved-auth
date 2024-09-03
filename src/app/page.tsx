import Hero from "@/components/shared/Hero";
import { getSession } from "@/lib/cookie";
import { redirect } from "next/navigation";

export default async function AnimatedLanding() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
    return
  }
  const loggedIn = session ? true : false;

  return <Hero loggedIn={loggedIn} />;
}
