import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SessionWrapper from "./components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Supportify - Fund it",
  description: "Fund your projects with Supportify",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          <Navbar/>
          <div className="mid min-h-[calc(100vh-155px)] sm:min-h-[calc(100vh-116px)] text-white relative">
            <div className="back absolute  z-[-2] min-h-[100%] w-[100%]
            bg-[radial-gradient(ellipse_90%_60%_at_50%_50%,rgba(0,0,0,0.9),rgba(0,0,0,1)_80%)]"></div>
          {children}
          </div>
          <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
