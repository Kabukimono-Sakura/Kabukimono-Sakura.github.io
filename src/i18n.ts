import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import zh from "./locales/zh.json";
import en from "./locales/en.json";
import ja from "./locales/ja.json";

const saved = localStorage.getItem("lang");
const initialLng = saved || "zh";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            zh: { translation: zh },
            en: { translation: en },
            ja: { translation: ja }
        },
        lng: initialLng,
        fallbackLng: "zh",
        interpolation: { escapeValue: false }
    });

export default i18n;
