import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
export const { handlers, auth, signIn, signOut } = NextAuth({
  session:{strategy:"jwt"},
  providers:[Credentials({credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(credentials){
    const email=String(credentials?.email||"").toLowerCase().trim(); const password=String(credentials?.password||"");
    if(!email||!password) return null; const user=await db.user.findUnique({where:{email}}); if(!user) return null;
    const ok=await bcrypt.compare(password,user.passwordHash); if(!ok) return null; return {id:user.id,name:user.name,email:user.email};
  }})],
  callbacks:{async jwt({token,user}){if(user) token.userId=user.id; return token;},async session({session,token}){if(session.user && token.userId) session.user.id=String(token.userId); return session;}},
  pages:{signIn:"/login"}
});
