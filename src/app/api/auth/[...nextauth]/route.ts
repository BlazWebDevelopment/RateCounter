import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/user/User";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await dbConnect();

      const existingUser = await User.findOne({ email: user.email });

      const incomeRecords: any[] = [];

      if (!existingUser) {
        const newUser = new User({
          email: user.email,
          name: user.name,
          profiles: [],
        });

        await newUser.save();
      }

      return true;
    },
  },
});

export { authHandler as GET, authHandler as POST };
