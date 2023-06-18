import "./globals.css";
import { Archivo } from "next/font/google";

const poppins = Archivo({
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
            <body className={poppins.className}>
                <nav className="min-h-12 py-2 gap-2 bg-slate-900 px-4 flex items-center justify-between sm:flex-row flex-col">
                    <div className="font-bold text-xl text-white grow">
                        TheGoated.Dev
                    </div>
                    <div className="flex items-center justify-center gap-4 grow">
                        <a
                            href="https://www.linkedin.com/in/thomas-burridge-devark/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-white transition-opacity"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/TheGoatedDev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-white transition-opacity"
                        >
                            Github
                        </a>
                        <a
                            href="https://twitter.com/TheGoatedDev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-white transition-opacity"
                        >
                            Twitter
                        </a>
                    </div>
                    <div className="grow flex justify-end">
                        <a
                            href="mailto:me@thegoated.dev"
                            className="bg-brand-gradient text-white px-4 py-1 rounded-full font-bold hover:opacity-80 transition-opacity"
                        >
                            Lets Talk
                        </a>
                    </div>
                </nav>
                {children}
            </body>
        </html>
    );
}
