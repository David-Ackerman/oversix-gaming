import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (account && user) {
				token.idToken = user.id;
				token.role = (user as any).role || "user";
			}
			return token;
		},
		async session({ session, token }) {
			console.log("session", session);
			console.log("token", token);
			if (!session.user) {
				return session;
			}

			session.user.id = token.idToken ?? "";
			session.user.role = token.role ?? "";
			return session;
		},
	},
});

export { handler as GET, handler as POST };
