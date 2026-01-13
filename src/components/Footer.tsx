import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="py-10 text-center text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Wentao Luo · {t("footer.built")}
        </footer>
    );
}
