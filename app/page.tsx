// // app/page.tsx
// import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button";
// // import { getServerSession } from "next-auth"; // Uncomment later when auth is ready

// export default async function Home() {
//   // const session = await getServerSession(); // Uncomment when using NextAuth

//   // if (session) {
//   //   redirect("http://localhost:3000/s/dashboard");
//   // } else {
//   //   redirect("http://localhost:3000/auth");
//   // }

//   // 👇 Temporary redirect (no session check)
//   // redirect("http://localhost:3000/s/dashboard");

  

//   // return null;

//   return (
   
//   );
// }


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
     
        <Card className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-md">
          <CardContent className="p-8 text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome!</h1>
            <p className="text-gray-600">
              Choose your dashboard to continue
            </p>

            <div className="flex flex-col gap-4">
              <Button asChild className="w-full text-lg">
                <a href="/s/dashboard">Student Dashboard</a>
              </Button>

              <Button asChild variant="outline" className="w-full text-lg">
                <a href="/t/dashboard">Teacher Dashboard</a>
              </Button>

              <Button asChild variant="secondary" className="w-full text-lg">
                <a href="/auth">Auth</a>
              </Button>
            </div>
          </CardContent>
        </Card>
     
    </div>
  );
}

 
