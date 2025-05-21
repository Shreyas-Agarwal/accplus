// import React from 'react';
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function Phone({ className, ...props }) {
//   return (
//     <div className={cn("grid gap-6", className)} {...props}>
//       <Card>
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl text-center">Login</CardTitle>
//           <CardDescription className="text-center">
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" placeholder="m@example.com" />
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password">Password</Label>
//                 <a 
//                   href="#" 
//                   className="text-sm text-blue-500 hover:text-blue-600 underline"
//                 >
//                   Forgot your password?
//                 </a>
//               </div>
//               <Input id="password" type="password" />
//             </div>
//             <Button className="w-full">Login</Button>
//           </div>
//           <div className="mt-4">
//             <Button variant="outline" className="w-full">
//               Login with Google
//             </Button>
//           </div>
//           <div className="mt-4 text-center text-sm">
//             Don&apos;t have an account?{" "}
//             <a href="#" className="text-blue-500 hover:text-blue-600 underline">
//               Sign up
//             </a>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }







// import React from 'react';

// export default function Phone() {
//   return (
//     <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
//       <div style={{
//         border: '1px solid #ccc',
//         borderRadius: 8,
//         padding: '1.5rem',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//       }}>
//         <header style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
//           <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Login</h2>
//           <p style={{ color: '#555', fontSize: '0.9rem' }}>
//             Enter your email below to login to your account
//           </p>
//         </header>
//         <form>
//           <div style={{ marginBottom: '1rem' }}>
//             <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem' }}>
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="m@example.com"
//               required
//               style={{
//                 width: '100%',
//                 padding: '0.5rem',
//                 borderRadius: 4,
//                 border: '1px solid #ccc',
//                 fontSize: '1rem',
//               }}
//             />
//           </div>

//           <div style={{ marginBottom: '1rem' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
//               <label htmlFor="password">Password</label>
//               <a
//                 href="#"
//                 style={{
//                   fontSize: '0.8rem',
//                   color: '#3b82f6',
//                   textDecoration: 'underline',
//                 }}
//               >
//                 Forgot your password?
//               </a>
//             </div>
//             <input
//               id="password"
//               type="password"
//               required
//               style={{
//                 width: '100%',
//                 padding: '0.5rem',
//                 borderRadius: 4,
//                 border: '1px solid #ccc',
//                 fontSize: '1rem',
//               }}
//             />
//           </div>

//           <button
//             type="submit"
//             style={{
//               width: '100%',
//               padding: '0.75rem',
//               backgroundColor: '#3b82f6',
//               border: 'none',
//               color: 'white',
//               fontSize: '1rem',
//               borderRadius: 4,
//               cursor: 'pointer',
//             }}
//           >
//             Login
//           </button>
//         </form>

//         <button
//           type="button"
//           style={{
//             marginTop: '1rem',
//             width: '100%',
//             padding: '0.75rem',
//             backgroundColor: 'white',
//             border: '1px solid #3b82f6',
//             color: '#3b82f6',
//             fontSize: '1rem',
//             borderRadius: 4,
//             cursor: 'pointer',
//           }}
//         >
//           Login with Google
//         </button>

//         <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
//           Don&apos;t have an account?{' '}
//           <a
//             href="#"
//             style={{ color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}
//           >
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }



import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Phone({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

