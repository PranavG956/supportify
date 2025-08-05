import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import Payment from '@/app/models/Payment'
import User from '@/app/models/User';
import connectDB from '@/db/connectDB'

export const authoptions=NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
  if (account.provider === "github") {
    await connectDB(); // Ensure the database connection is established
    const email = user?.email;
    if (!email) {
      console.error("No email found in user object");
      return false;
    }

    let currentUser = await User.findOne({ email : email });
    if (!currentUser) {
      const newUser = await User.create({
        email: email,
        username: email.split("@")[0],
        name: user.name || "New User",
        profile: user.image || "", // GitHub usually returns image in user.image
      });
      await newUser.save();
      console.log("New user created:", newUser);
      user.username = newUser.username;
    } else {
      user.username = currentUser.username;
    }
    return true;
  }
},
  async session({ session, token, user }) {
    const dbuser = await User.findOne({ email: session.user.email });
    this.session.username = dbuser.username;
    return session;
    },
  }
})

export {authoptions as GET, authoptions as POST}