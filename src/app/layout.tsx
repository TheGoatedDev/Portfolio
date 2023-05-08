import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    display: "swap",
    weight: ["400", "700"],
    subsets: ["latin"],
});

export const metadata = {
    title: "The Goated Dev",
    description:
        "Versatile Full-Stack and Mobile App Engineer and IoT Expert: Transforming Energy Management with Real-time Solutions.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}
