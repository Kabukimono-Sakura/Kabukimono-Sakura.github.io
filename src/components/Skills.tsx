import Section from "./Section";
import { useTranslation } from "react-i18next";

function ListCard({ title, items }: { title: string; items: string[] }) {
    return (
        <div className="card p-6 h-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
            </h3>

            <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed">
                {items.map((x, i) => (
                    <li key={i} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                        <span>{x}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ThreeColumnListCard({ title, items }: { title: string; items: string[] }) {
    return (
        <div className="card p-6 h-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
            </h3>

            {/* ✅ 修习课程：手机 1 列，平板 2 列，桌面 3 列 */}
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed">
                {items.map((x, i) => (
                    <li key={i} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                        <span>{x}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Skills() {
    const { t } = useTranslation();

    const cols = t("skills.columns", { returnObjects: true }) as {
        courses: { title: string; items: string[] };
        tech: { title: string; items: string[] };
        others: { title: string; items: string[] };
        hobbies: { title: string; items: string[] };
    };

    return (
        <Section
            id="skills"
            title={t("skills.title")}
            subtitle={t("skills.subtitle")}
        >
            <div className="grid lg:grid-cols-2 gap-4">
                {/* ✅ 修习课程三列 */}
                <ThreeColumnListCard
                    title={cols.courses.title}
                    items={cols.courses.items}
                />

                {/* 其余三栏保持单列段落式 */}
                <ListCard
                    title={cols.tech.title}
                    items={cols.tech.items}
                />
                <ListCard
                    title={cols.others.title}
                    items={cols.others.items}
                />
                <ListCard
                    title={cols.hobbies.title}
                    items={cols.hobbies.items}
                />
            </div>
        </Section>
    );
}
