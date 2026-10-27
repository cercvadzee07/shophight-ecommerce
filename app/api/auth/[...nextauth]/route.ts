import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "NEONDEV ID",
      credentials: {
        email: {
          label: "ელ. ფოსტა",
          type: "text",
          placeholder: "beka@neondev.ge",
        },
        password: { label: "პაროლი", type: "password" },
      },
      async authorize(credentials) {
        // აქ შეგიძლია რეალურ ბაზას დაუკავშირდე მომავალში.
        // ახლა ვამოწმებთ "ჰარდკოდირებულ" დემო იუზერს:
        if (
          credentials?.email === "beka@neondev.ge" &&
          credentials?.password === "neon2026"
        ) {
          return {
            id: "1",
            name: "ბექა წერცვაძე",
            email: "beka@neondev.ge",
            image:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=Beka&backgroundColor=1f2335",
            // DiceBear API გენერირებს მაგარ ავატარს შენი სახელით
          };
        }
        return null; // თუ პაროლი ან მეილი არასწორია
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-neondev-key-2026",
});

export { handler as GET, handler as POST };
