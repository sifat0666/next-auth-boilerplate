import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github";
import  CredentialsProvider  from "next-auth/providers/credentials"
// import { encode } from "next-auth/jwt"

const prisma = new PrismaClient()
const google_id: any = process.env.GOOGLE_ID
const google_secret: any = process.env.GOOGLE_SECRET

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: google_id,
      clientSecret: google_secret,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
    // CredentialsProvider({
    //   credentials:{
    //     email: {label:'Email', type:'text', placeholder:'example@email.com'},
    //     password: {label: 'password', type:'password'},
    //   },
      
    //   async authorize(credentials, req) {
    //   // Add logic here to look up the user from the credentials supplied

    //   const res = await fetch('http://localhost:3000/api/login', {
    //     method: 'POST',
    //     body: JSON.stringify(credentials),
    //     headers: {'Content-Type': 'application/json'}
    //   })
    //   // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
    //   const user = res.json()
    //   if (user) {
    //     // Any object returned will be saved in `user` property of the JWT
    //     return user
    //   } else {
    //     // If you return null then an error will be displayed advising the user to check their details.
    //     return null

    //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //   }
    // }
    // })
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
  debug: true,
  pages:{
    signIn: '/signin'
  }
})