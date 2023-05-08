import { IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:text-left text-center">
                <Image
                    src="/ProfilePicture.jpeg"
                    alt="The Goated Dev Profile Picture"
                    width={200}
                    height={200}
                    className="rounded-full w-48 h-48  mb-2"
                />
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-bold">The Goated Dev 🐐</h1>
                    <p className="text-xl text-gray-400">
                        Versatile Full-Stack and Mobile App Engineer and IoT
                        Expert: Transforming Energy Management with Real-time
                        Solutions.
                    </p>
                    <div className="flex gap-4 mt-4 justify-center md:justify-start">
                        <a
                            href="https://www.linkedin.com/in/thomas-burridge-software/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full transition-colors"
                        >
                            <IconBrandLinkedin />
                        </a>
                        <a
                            href="mailto:thomas@devarksolutions.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold p-2 rounded-full transition-colors"
                        >
                            <IconMail />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
