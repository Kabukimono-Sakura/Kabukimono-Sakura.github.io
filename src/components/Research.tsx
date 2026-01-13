import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { profile } from "../data/profile";

type DownloadItemProps = {
    title: string;
    subtitle?: string;
    href?: string;
    thumb?: string;
    actionLabel: string;
    comingSoonLabel: string;
};

function DownloadItem(props: DownloadItemProps) {
    const { title, subtitle, href, thumb, actionLabel, comingSoonLabel } = props;
    const enabled = Boolean(href);

    return (
        <a
            href={enabled ? href : undefined}
            target={enabled ? "_blank" : undefined}
            rel={enabled ? "noreferrer noopener" : undefined}
            aria-disabled={!enabled}
            className={[
                "group block overflow-hidden rounded-2xl border bg-white/60 shadow-soft backdrop-blur transition",
                "dark:bg-zinc-900/40 dark:border-zinc-800",
                enabled
                    ? "border-zinc-200 hover:bg-white/80 dark:hover:bg-zinc-900/55"
                    : "border-zinc-200/60 opacity-70 cursor-not-allowed dark:border-zinc-800/60",
            ].join(" ")}
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                {thumb ? (
                    <img
                        src={thumb}
                        alt={`${title} preview`}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-500 dark:text-zinc-400">
                        Preview
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</div>
                        {subtitle ? (
                            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">{subtitle}</div>
                        ) : null}
                    </div>

                    <span
                        className={[
                            "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
                            enabled
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                                : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
                        ].join(" ")}
                    >
                        {enabled ? actionLabel : comingSoonLabel}
                    </span>
                </div>
            </div>
        </a>
    );
}

export default function Research() {
    const { t } = useTranslation();

    const keywords = t("research.keywords", { returnObjects: true }) as string[];
    const cardTitle = t("research.cardTitle");
    const meta = t("research.meta", {
        org: profile.research.org,
        advisor: profile.research.advisor,
    });

    const figureUrl = (profile.research as any).figureUrl as string | undefined;

    return (
        <section id="research" className="pt-14 pb-10">
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{t("research.title")}</h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                {/* Left: title + meta + figure */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="lg:col-span-7 h-full"
                >
                    <div className="card p-6 h-full flex flex-col">
                        <h3 className="text-xl md:text-2xl font-semibold tracking-tight whitespace-pre-line">
                            {cardTitle}
                        </h3>

                        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{meta}</div>

                        <div className="mt-5 flex-1">
                            {figureUrl ? (
                                <a
                                    href={figureUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="block h-full"
                                    title="点击查看大图"
                                    aria-label="Open research figure"
                                >
                                    <div className="h-full w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/30">
                                        <img
                                            src={figureUrl}
                                            alt="Research framework figure"
                                            className="h-full w-full object-contain p-3"
                                            loading="lazy"
                                        />
                                    </div>
                                </a>
                            ) : (
                                <div className="h-full flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
                                    figureUrl not set
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Right: heading + downloads + keywords */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                    className="lg:col-span-5 h-full"
                >
                    <div className="card p-6 h-full flex flex-col">
                        {/* 右侧顶部标题 + 分割线（修复版） */}
                        <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                            {t("research.downloadsHeading")}
                        </div>
                        <div className="mt-3 h-px w-full bg-zinc-200/70 dark:bg-zinc-800/70" />

                        {/* downloads：两张并排 */}
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <DownloadItem
                                title={t("research.report")}
                                subtitle="PDF"
                                href={profile.research.reportUrl}
                                thumb={(profile.research as any).reportThumb}
                                actionLabel={t("research.download")}
                                comingSoonLabel={t("research.comingSoon")}
                            />

                            <DownloadItem
                                title={t("research.slides")}
                                subtitle="PPTX"
                                href={profile.research.slidesUrl}
                                thumb={(profile.research as any).slidesThumb}
                                actionLabel={t("research.download")}
                                comingSoonLabel={t("research.comingSoon")}
                            />
                        </div>

                        {/* keywords */}
                        <div className="mt-auto pt-5">
                            <div className="flex flex-wrap gap-2">
                                {keywords.map((k) => (
                                    <span
                                        key={k}
                                        className="inline-flex items-center rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-200"
                                    >
                                        {k}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
