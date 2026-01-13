import Section from "./Section";
import { useTranslation } from "react-i18next";

export default function Projects() {
    const { t } = useTranslation();

    return (
        <Section id="projects" title={t("projects.title")} subtitle={t("projects.subtitle")}>
        </Section>
    );
}
