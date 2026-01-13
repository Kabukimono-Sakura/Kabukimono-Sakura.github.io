import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { profile } from "../data/profile";

type ActionButtonProps = {
    label: string;
    onClick?: () => void;
    href?: string;
    external?: boolean;
    children: React.ReactNode;
};

function ActionButton(props: ActionButtonProps) {
    const { label, onClick, href, external, children } = props;

    const base =
        "group relative inline-flex h-11 w-11 items-center justify-center overflow-visible rounded-2xl border border-zinc-200 bg-white/60 shadow-soft backdrop-blur transition hover:bg-white/80 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/55";

    const inner = (
        <>
            <span className="text-zinc-700 transition group-hover:text-zinc-900 dark:text-zinc-200 dark:group-hover:text-white">
                {children}
            </span>

            <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-1 rounded-xl border border-zinc-200 bg-white/95 px-3 py-1 text-center text-xs font-semibold text-zinc-700 opacity-0 shadow-soft backdrop-blur transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-2 dark:border-zinc-800 dark:bg-zinc-950/90 dark:text-zinc-200 whitespace-normal break-words">
                {label}
            </span>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                className={base}
                aria-label={label}
            >
                {inner}
            </a>
        );
    }

    return (
        <button type="button" onClick={onClick} className={base} aria-label={label}>
            {inner}
        </button>
    );
}

function MailIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 6.5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
            <path d="m4.5 8.2 7.1 5.1a1 1 0 0 0 1.2 0l7.2-5.1" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.2 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.6a2 2 0 0 1-.45 2.11L8.09 9.54a16 16 0 0 0 6 6l1.11-1.11a2 2 0 0 1 2.11-.45c.83.27 1.7.47 2.6.59A2 2 0 0 1 22 16.92Z" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 19c-5 1.5-5-2.5-7-3" />
            <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" />
        </svg>
    );
}

function ResumeIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
            <path d="M14 2v5h5" />
            <path d="M12 11v6" />
            <path d="M9.5 14.5 12 17l2.5-2.5" />
        </svg>
    );
}

async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            return true;
        } catch {
            return false;
        }
    }
}

export default function Hero() {
    const { t } = useTranslation();
    const chips = t("hero.chips", { returnObjects: true }) as unknown as string[];

    const portraitSrc = (profile as any).portrait ?? profile.avatar;

    const advisor = (profile as any).heroCards?.advisor;
    const certificates: string[] = (profile as any).heroCards?.certificates ?? [];
    const honors: string[] = (profile as any).heroCards?.honors ?? [];

    const [copiedKey, setCopiedKey] = useState<"email" | "phone" | null>(null);

    const emailLabel = useMemo(() => {
        if (copiedKey === "email") return t("hero.copied");
        return profile.email;
    }, [copiedKey, t]);

    const phoneLabel = useMemo(() => {
        if (copiedKey === "phone") {
            return langSafeCopiedPhone(t);
        }
        return profile.phone;
    }, [copiedKey, t]);

    const onCopy = async (key: "email" | "phone", value: string) => {
        const ok = await copyToClipboard(value);
        if (!ok) return;
        setCopiedKey(key);
        window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 900);
    };

    const resumeUrl = (profile as any).resume ?? (profile as any).resumeUrl ?? "/files/resume.pdf";

    // ✅ SEO：稳定的人名信号（不依赖 i18n）
    const seoName = "罗文韬（Wentao Luo）";

    return (
        <section id="home" className="pt-14 pb-10">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="lg:col-span-8"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        {t("hero.badge")}
                    </div>

                    {/* ✅ 关键：H1 必须稳定包含“罗文韬” */}
                    <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                        {seoName}
                        {/* 保留原 i18n title（给屏幕阅读器/可访问性），不影响视觉与 SEO */}
                        <span className="sr-only">{t("hero.title")}</span>
                    </h1>

                    <p className="mt-5 whitespace-pre-line text-zinc-600 dark:text-zinc-300 text-base md:text-lg leading-relaxed">
                        {t("hero.subtitle")}
                    </p>

                    <div className="mt-6 relative z-20 flex justify-center">
                        <div className="flex items-center gap-14">
                            <ActionButton label={emailLabel} onClick={() => onCopy("email", profile.email)}>
                                <MailIcon />
                            </ActionButton>

                            <ActionButton label={phoneLabel} onClick={() => onCopy("phone", profile.phone)}>
                                <PhoneIcon />
                            </ActionButton>

                            <ActionButton href={profile.github} label="GitHub: Kabukimono-Sakura" external>
                                <GitHubIcon />
                            </ActionButton>

                            <ActionButton href={resumeUrl} label={t("hero.resume")} external>
                                <ResumeIcon />
                            </ActionButton>
                        </div>
                    </div>

                    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(18,minmax(0,1fr))] gap-4 items-stretch">
                        <div className="card p-3 lg:col-span-4 flex flex-col justify-center">
                            <div className="text-xs text-center text-zinc-500 dark:text-zinc-400">
                                学科绩点与专业排名
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <div className="text-center">
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">学科绩点</div>
                                    <div className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                        {profile.gpa}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">专业排名</div>
                                    <div className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                        {profile.rank}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card p-3 lg:col-span-4 flex flex-col justify-center">
                            <div className="text-xs text-center text-zinc-500 dark:text-zinc-400">学业导师</div>
                            <div className="mt-3 text-center">
                                <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    {advisor?.line1 ?? "南方科技大学教授"}
                                </div>
                                <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    {advisor?.line2 ?? "计算机学院副院长"}
                                </div>
                                <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                                    {advisor?.name ?? "郝祁"}
                                </div>
                            </div>
                        </div>

                        <div className="card p-3 lg:col-span-3 flex flex-col justify-center">
                            <div className="text-xs text-center text-zinc-500 dark:text-zinc-400">学术证书</div>
                            <div className="mt-3 text-center text-sm font-semibold leading-snug whitespace-pre-line text-zinc-900 dark:text-zinc-100">
                                {certificates.length ? certificates.join("\n") : "CET-4\nCET-6"}
                            </div>
                        </div>

                        <div className="card p-3 lg:col-span-7 flex flex-col justify-center">
                            <div className="text-xs text-center text-zinc-500 dark:text-zinc-400">所获荣誉</div>
                            <div className="mt-3">
                                <ul className="mx-auto w-fit text-center text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
                                    {(honors.length
                                        ? honors
                                        : [
                                            "全国数学建模大赛广东省一等奖",
                                            "MCM Successful Participant",
                                            "(As the Team Leader)",
                                            "2025年南科大优秀学生",
                                        ]
                                    ).map((x) => (
                                        <li key={x} className="py-0.5">
                                            {x}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
                    className="lg:col-span-4 lg:flex lg:flex-col lg:items-end"
                >
                    <div className="w-full max-w-[380px]">
                        <div className="overflow-hidden rounded-3xl shadow-soft">
                            <div className="aspect-[5/6] w-full">
                                <img
                                    src={portraitSrc}
                                    alt="portrait"
                                    className="h-full w-full object-cover object-top scale-[1.06]"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="mt-6">
                <div className="flex flex-wrap justify-center gap-2">
                    {Array.isArray(chips) &&
                        chips.map((x) => (
                            <span key={x} className="chip">
                                {x}
                            </span>
                        ))}
                </div>
            </div>
        </section>
    );
}

function langSafeCopiedPhone(t: (key: string) => string) {
    const copied = t("hero.copied");
    if (copied && copied.toLowerCase().includes("email")) return "已复制电话";
    return copied || "已复制电话";
}
