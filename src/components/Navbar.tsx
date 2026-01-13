import { useEffect, useState } from "react";
import { cn } from "../lib/cn";
import { useTranslation } from "react-i18next";
import { profile } from "../data/profile";

type Props = {
    dark: boolean;
    onToggleDark: () => void;
    lang: "zh" | "en" | "ja";
    onSetLang: (v: "zh" | "en" | "ja") => void;
};

export default function Navbar({ dark, onToggleDark, lang, onSetLang }: Props) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ✅ 顺序按中文为标准：关于我 → 科研成果 → 能力与爱好 → 成长履历 → 课程资源与项目实现
    const links = [
        ["about", t("nav.about")],
        ["research", t("nav.research")],
        ["skills", t("nav.skills")],
        ["timeline", t("nav.timeline")],
        ["projects", t("nav.projects")]
    ] as const;

    return (
        <header
            className={cn(
                "sticky top-0 z-40 border-b backdrop-blur",
                scrolled
                    ? "border-zinc-200/70 bg-white/70 dark:border-zinc-800/70 dark:bg-zinc-950/50"
                    : "border-transparent bg-transparent"
            )}
        >
            {/* ✅ relative：为了让中间导航可以 absolute 居中 */}
            <div className="relative mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                <a href="#home" className="flex items-center gap-3">
                    {/* avatar */}
                    <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/40">
                        <img src={profile.avatar} alt="avatar" className="h-full w-full object-cover" loading="lazy" />
                    </div>

                    <div className="leading-tight">
                        <div className="font-semibold">Wentao Luo</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">{t("nav.tagline")}</div>
                    </div>
                </a>

                {/* ✅ 桌面端：整体绝对居中，英文长标题自动两行且居中 */}
                <nav className="hidden md:flex absolute left-1/2 -translate-x-[42%] items-center gap-8 text-center">

                    {links.map(([id, label]) => (
                        <a
                            key={id}
                            className="navlink max-w-[11rem] leading-snug text-center"
                            href={`#${id}`}
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2">
                        <button className="btn-ghost" onClick={() => onSetLang("zh")} aria-label="中文">
                            <span className={cn(lang === "zh" && "font-extrabold")}>中</span>
                        </button>
                        <button className="btn-ghost" onClick={() => onSetLang("en")} aria-label="English">
                            <span className={cn(lang === "en" && "font-extrabold")}>EN</span>
                        </button>
                        <button className="btn-ghost" onClick={() => onSetLang("ja")} aria-label="日本語">
                            <span className={cn(lang === "ja" && "font-extrabold")}>日</span>
                        </button>
                    </div>

                    <button className="btn-ghost" onClick={onToggleDark} aria-label="theme">
                        {dark ? "☀" : "🌙"}
                    </button>

                    <button className="btn-ghost md:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
                        ☰
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden border-t border-zinc-200/70 dark:border-zinc-800/70">
                    <div className="mx-auto max-w-6xl px-4 py-3 grid gap-2">
                        {links.map(([id, label]) => (
                            <a key={id} className="navlink py-2" href={`#${id}`} onClick={() => setOpen(false)}>
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
