import Section from "./Section";
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();
    const paras = t("about.paras", { returnObjects: true }) as string[];
    const highlights = t("about.highlights", { returnObjects: true }) as string[];

    return (
        <Section id="about" title={t("about.title")} subtitle={t("about.subtitle")}>
            <div className="card p-6 md:p-8 grid md:grid-cols-12 gap-8">
                <div className="md:col-span-7">
                    <h3 className="text-xl font-semibold">{t("about.meTitle")}</h3>
                    <div className="mt-4 space-y-4 text-zinc-700 dark:text-zinc-200 leading-relaxed">
                        {paras.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
                    </div>
                </div>
                <div className="md:col-span-5">
                    <h3 className="text-xl font-semibold">{t("about.hlTitle")}</h3>
                    <ul className="mt-4 space-y-3">
                        {highlights.map((x, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="mt-1">✦</span>
                                <div className="text-zinc-700 dark:text-zinc-200" dangerouslySetInnerHTML={{ __html: x }} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Section>
    );
}
