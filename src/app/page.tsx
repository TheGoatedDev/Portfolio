import {
    IconArrowDown,
    IconBrandLinkedin,
    IconMail,
    IconStar,
    IconStarFilled,
} from "@tabler/icons-react";
import Image from "next/image";

export default function Home() {
    return (
        <main>
            <div className="py-2 px-4 h-[calc(100vh-8rem)] sm:h-[calc(100vh-4rem)] flex items-center justify-center sm:justify-evenly flex-col sm:flex-row gap-8 relative">
                <h1 className="sm:w-1/3 text-center sm:text-left">
                    Hello, I&apos;m{" "}
                    <span className="text-brand-gradient">Thomas,</span>
                    <br />
                    Software Engineer Contractor based in the UK
                </h1>
                <div className="md:w-[400px] w-[250px] aspect-square relative">
                    <Image
                        className="rounded-full"
                        src={"/ProfilePicture.jpeg"}
                        fill
                        alt="Profile Picture"
                    />
                </div>
                <IconArrowDown
                    size={48}
                    className="absolute left-1/2 bottom-2 -translate-x-1/2"
                />
            </div>

            <div className="flex items-center justify-center gap-4 min-h-32 bg-brand-gradient py-4 flex-col my-4">
                <h2 className="text-white -my-2">I Develop</h2>
                <div className="flex w-full bg-white min-h-24 -skew-y-1 shadow-xl justify-evenly items-center flex-wrap gap-4 py-2 px-2">
                    <h2>Web Apps</h2>
                    <IconStarFilled />
                    <h2>MVPs</h2>
                    <IconStarFilled />
                    <h2>IoT Apps</h2>
                    <IconStarFilled />
                    <h2>Backends</h2>
                    <IconStarFilled />
                    <h2>Frontends</h2>
                    <IconStarFilled />
                    <h2>Dashboards</h2>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 h-32 bg-brand-gradient flex-col">
                <h2 className="text-white">Still Under-development</h2>
            </div>
        </main>
    );
}
