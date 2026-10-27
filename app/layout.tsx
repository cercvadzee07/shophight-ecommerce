import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopNight - Modern E-Commerce",
  description: "Cyberpunk Next.js E-Commerce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-[#0f111a] text-white min-h-screen relative overflow-x-hidden selection:bg-[#7aa2f7] selection:text-[#1a1b26]">
        <AuthProvider>
          {/* ჰოლოგრამული ფონის ნეონის ლაქები */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[#7aa2f7]/10 rounded-full blur-[140px] animate-aurora"></div>
            <div
              className="absolute top-[40%] -right-[10%] w-[45vw] h-[45vw] bg-[#bb9af7]/10 rounded-full blur-[140px] animate-aurora"
              style={{ animationDelay: "5s" }}
            ></div>
            <div
              className="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] bg-[#9ece6a]/5 rounded-full blur-[140px] animate-aurora"
              style={{ animationDelay: "10s" }}
            ></div>
          </div>

          {/* მთავარი კონტენტი */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>

          {/* Toaster შეტყობინებებისთვის */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1f2335",
                color: "#c0caf5",
                border: "1px solid #24283b",
                boxShadow: "0 0 20px rgba(122, 162, 247, 0.25)",
                borderRadius: "1rem",
                padding: "12px 18px",
                fontSize: "14px",
                fontWeight: "600",
              },
              success: {
                iconTheme: {
                  primary: "#9ece6a",
                  secondary: "#16161e",
                },
                style: {
                  border: "1px solid rgba(158, 206, 106, 0.3)",
                },
              },
              error: {
                iconTheme: {
                  primary: "#f7768e",
                  secondary: "#16161e",
                },
                style: {
                  border: "1px solid rgba(247, 118, 142, 0.3)",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
