import NextAuth from 'next-auth'
import GIthubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import FacebookProvider from "next-auth/providers/facebook";

const options = {
    // sessions: {
    //     jwt: true
    // },
    providers: [
        
        GIthubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        //   FacebookProvider({
        //     clientId: process.env.FACEBOOK_CLIENT_ID,
        //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        // })


        
    ],
    database: process.env.DATABASE_URL
}

export default (req, res) => NextAuth(req, res, options)