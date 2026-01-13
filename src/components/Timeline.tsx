import Section from "./Section";
import { useTranslation } from "react-i18next";

type TimelineItem = {
    time: string;
    title: string;
    desc?: string;
    type?: "award" | "language" | "sports" | "other";
    preview?: string; // hover 预览图（public 路径），也作为点击打开的链接
};

function dotClass(type?: TimelineItem["type"]) {
    switch (type) {
        case "award":
            return "bg-amber-500";
        case "language":
            return "bg-sky-500";
        case "sports":
            return "bg-emerald-500";
        default:
            return "bg-zinc-900 dark:bg-white";
    }
}

export default function Timeline() {
    const { t } = useTranslation();
    const raw = t("timeline.items", { returnObjects: true }) as TimelineItem[];

    // Desktop：左→右按时间从早到晚
    const itemsAsc = [...raw].sort((a, b) => {
        const ya = Number(String(a.time).match(/\d+/)?.[0] ?? 0);
        const yb = Number(String(b.time).match(/\d+/)?.[0] ?? 0);
        if (ya !== yb) return ya - yb;
        return 0;
    });

    // Mobile：纵向最新在上
    const itemsDesc = [...itemsAsc].reverse();

    return (
        <Section id="timeline" title={t("timeline.title")} subtitle={t("timeline.subtitle")}>
            {/* ===================== Mobile: Vertical ===================== */}
            <div className="lg:hidden">
                <div className="card p-6">
                    <div className="space-y-6">
                        {itemsDesc.map((item, idx) => (
                            <div key={`${item.time}-${idx}`} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className={`h-3 w-3 rounded-full ${dotClass(item.type)}`} />
                                    <div className="mt-1 w-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                                            {item.title}
                                        </div>
                                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                            {item.time}
                                        </div>
                                    </div>

                                    {item.desc ? (
                                        <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                                            {item.desc}
                                        </div>
                                    ) : null}

                                    {item.preview ? (
                                        <a
                                            href={item.preview}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="mt-2 inline-flex items-center rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-200 dark:hover:bg-zinc-900/60"
                                        >
                                            新标签页浏览
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===================== Desktop: Horizontal (Grid) ===================== */}
            <div className="hidden lg:block">
                <div className="card p-6">
                    {/* ✅ 两侧收中间：限制内容宽度 + 内边距 */}
                    <div className="mx-auto max-w-[1100px] px-6">
                        {/* 轴线：跟随同一宽度/内边距 */}
                        <div className="relative">
                            <div className="absolute left-0 right-0 top-10 h-px bg-zinc-200 dark:bg-zinc-800" />

                            {/* ✅ 用 grid 固定列，彻底避免 flex 把两端“拉出去” */}
                            <div className="relative grid grid-cols-7 gap-4">
                                {itemsAsc.slice(0, 7).map((item, idx) => {
                                    const Node = (
                                        <div className="group relative flex flex-col items-center">
                                            {/* 时间 */}
                                            <div className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">
                                                {item.time}
                                            </div>

                                            {/* 圆点 */}
                                            <div className={`relative z-10 h-3.5 w-3.5 rounded-full ${dotClass(item.type)}`} />

                                            {/* 标题：限制宽度，自动换行，不撑爆 */}
                                            <div className="mt-4 w-full text-center">
                                                <div className="mx-auto max-w-[140px] text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug break-words">
                                                    {item.title}
                                                </div>

                                                {item.preview ? (
                                                    <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 opacity-0 transition group-hover:opacity-100">
                                                        新标签页浏览
                                                    </div>
                                                ) : null}
                                            </div>

                                            {/* Hover 预览（不挡点击） */}
                                            {item.preview ? (
                                                <div className="pointer-events-none absolute left-1/2 top-0 z-50 w-[280px] -translate-x-1/2 -translate-y-3 opacity-0 transition duration-200 group-hover:opacity-100 group-hover:-translate-y-6">
                                                    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-soft dark:border-zinc-800 dark:bg-zinc-950">
                                                        <div className="aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900">
                                                            <img
                                                                src={item.preview}
                                                                alt={`${item.title} preview`}
                                                                className="h-full w-full object-cover"
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                        <div className="p-3">
                                                            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                                {item.title}
                                                            </div>
                                                            <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                                                                新标签页浏览
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    );

                                    // ✅ 节点可点击打开（修复“点不开”）
                                    return item.preview ? (
                                        <a
                                            key={`${item.time}-${idx}`}
                                            href={item.preview}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="block focus:outline-none"
                                            aria-label={`Open ${item.title} in new tab`}
                                            title="新标签页浏览"
                                        >
                                            {Node}
                                        </a>
                                    ) : (
                                        <div key={`${item.time}-${idx}`}>{Node}</div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 图例 */}
                        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-zinc-600 dark:text-zinc-300">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                奖项
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                                语言
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                体育
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
