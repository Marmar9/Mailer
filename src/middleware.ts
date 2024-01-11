// import { NextResponse, NextRequest } from "next/server";
// import jwt from "jsonwebtoken";
// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("next-auth.session-token");
//   console.log("aaaaa");
//   console.log("token", token);
//   if (token) {
//     try {
//       const session = jwt.verify(
//         token.value,
//         process.env.NEXTAUTH_URL as string
//       );
//       if (!session) {
//         return NextResponse.redirect("/");
//       }
//     } catch (error) {
//       console.error("Session verification error:", error);
//       return NextResponse.redirect("/");
//     }
//   } else {
//     return NextResponse.redirect("/");
//   }
// }

export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/messages/:id*"],
};
