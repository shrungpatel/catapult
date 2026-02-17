import HorizontalLines from "./Lines"
import PillBadge from "./Pill"
import PrizeCategories from "./Categories"

export default function About() {
    return (
        <section id="about" className="relative min-h-[200vh] mt-5 flex flex-col items-center justify-start bg-[#151c43] text-white px-6 py-24">
            <div className="relative flex flex-col items-center justify-center max-w-4xl text-center z-10 w-full">
                <p className="text-lg leading-tight w-[90%] mb-8">
                    Catapult is a 36-hour AI + ML x Entrepreneurship hackathon hosted by ML@Purdue!
                    It is the only ML-focused hackathon at Purdue and is open to all students across all skill levels.
                    Start with an idea, work with others to bring it to life, and share what you've built at the end!
                </p>
                <div className="flex flex-row gap-6 items-center justify-center">
                    <PillBadge text="April 3rd - 5th" width={360} height={140} />
                    <PillBadge text="WALC" width={360} height={140} />
                </div>
                <div className="mt-13 relative flex flex-col items-center justify-center text-center z-10">
                    <p className="text-lg w-[80%] leading-tight">
                        4 - 6 people per team. Guaranteed prize awarded to all valid submissions to claim at the closing ceremony!
                    </p>
                </div>
            </div>
            <div className="mt-30 relative flex flex-col items-center justify-center max-w-4xl text-center z-10 w-full">
                <h1 className="text-5xl -mb-20 font-semibold">Categories</h1>
                <PrizeCategories />
            </div>
            <HorizontalLines />
        </section>
    )
}