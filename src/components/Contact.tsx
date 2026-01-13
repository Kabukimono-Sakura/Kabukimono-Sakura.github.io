import Section from "./Section";
import { useTranslation } from "react-i18next";
import { profile } from "../data/profile";

export default function Contact() {
    const { t } = useTranslation();

    return (
        <Section id="contact" title={t("contact.title")} subtitle={t("contact.subtitle")}>
            <div className="grid lg:grid-cols-3 gap-4">
                <div className="card p-6 lg:col-span-2">
                    <h3 className="text-lg font-semibold">{t("contact.connectTitle")}</h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-300">{t("contact.connectDesc")}</p>

                    <div className="mt-5 grid sm:grid-cols-2 gap-3">
                        <a className="btn-ghost justify-start" href={`mailto:${profile.email}`}>{t("contact.email")}: {profile.email}</a>
                        <a className="btn-ghost justify-start" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                        <a className="btn-ghost justify-start" href={profile.resume} target="_blank" rel="noreferrer">{t("contact.resume")}</a>
                        <a className="btn-ghost justify-start" href="#home">{t("contact.backTop")}</a>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {t("contact.quotes", { returnObjects: true })?.map?.((x: string) => (
                            <span key={x} className="chip">{x}</span>
                        ))}
                    </div>
                </div>

                <div className="card p-6">
                    <h3 className="text-lg font-semibold">{t("contact.statusTitle")}</h3>
                    <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
                        {(t("contact.status", { returnObjects: true }) as string[]).map((x, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="mt-1 text-emerald-500">✔</span>
                                <div>{x}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Section>
    );
}
