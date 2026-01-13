import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Research from "./components/Research";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";

export default function App() {
    const { i18n } = useTranslation();
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    const lang = i18n.language;
    const setLang = (next: "zh" | "en" | "ja") => {
        i18n.changeLanguage(next);
        localStorage.setItem("lang", next);
        document.documentElement.lang = next === "zh" ? "zh" : next === "ja" ? "ja" : "en";
    };

    const bg = useMemo(
        () => (
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-[0.25] dark:opacity-[0.18]" />
                <div className="glow left-[-180px] top-[-160px] h-[520px] w-[520px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,.9),rgba(99,102,241,0))]" />
                <div className="glow right-[-180px] bottom-[-160px] h-[520px] w-[520px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,.9),rgba(16,185,129,0))]" />
            </div>
        ),
        []
    );

    return (
        <div>
            {bg}
            <Navbar dark={dark} onToggleDark={() => setDark((v) => !v)} lang={lang as any} onSetLang={setLang} />

            <main className="mx-auto max-w-6xl px-4">
                <Hero />
                <About />
                <Research />
                <Skills />
                <Timeline />
                <Projects />
                <Footer />
            </main>
        </div>
    );
}
