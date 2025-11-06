// app/page.tsx
import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth"; // Uncomment later when auth is ready

export default async function Home() {
  // const session = await getServerSession(); // Uncomment when using NextAuth

  // if (session) {
  //   redirect("http://localhost:3000/s/dashboard");
  // } else {
  //   redirect("http://localhost:3000/auth");
  // }

  // 👇 Temporary redirect (no session check)
  redirect("http://localhost:3000/s/dashboard");

  return null;
}
