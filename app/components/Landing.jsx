import Spiral from "./Spiral";

export default function Landing() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-start overflow-hidden">
            <Spiral />
            <div className="relative z-10 text-left pl-10 md:pl-24">
                <h1 className="text-7xl md:text-7.5xl font-extrabold tracking-tight text-white font-[family-name:var(--font-unbounded)]">
                    CATAPULTHACKS
                </h1>
                <p className="mt-4 text-2xl md:text-3xl font-semibold text-[#6be5be] tracking-tight">
                    @ WALC | April 3rd - 5th, 2026
                </p>
            </div>
        </section>
    )
}