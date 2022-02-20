import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github";
// import { encode } from "next-auth/jwt"

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  }),
  // EmailProvider({
  //     server: {
  //       host: process.env.EMAIL_SERVER_HOST,
  //       port: process.env.EMAIL_SERVER_PORT,
  //       auth: {
  //         user: process.env.EMAIL_SERVER_USER,
  //         pass: process.env.EMAIL_SERVER_PASSWORD
  //       }
  //     },
  //     from: process.env.EMAIL_FROM
  //   })
  ],

  secret: process.env.SECRET,
  session:{
    strategy:'jwt'
  },
  jwt:{
    secret: process.env.SECRET
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  },
  debug: true
})