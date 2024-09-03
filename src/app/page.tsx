import Hero from "@/components/shared/Hero";
import { getSession } from "@/lib/cookie";

export default async function AnimatedLanding() {
  const session = await getSession();
  const loggedIn = session ? true : false;

  return <Hero loggedIn={loggedIn} />;
}
