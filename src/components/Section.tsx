import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export default function Section(
    props: PropsWithChildren<{ id: string; title: string; subtitle?: string }>
) {
    const { id, title, subtitle, children } = props;

    return (
        <section id={id} className="py-16">
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="mb-8"
            >
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
                {subtitle && <p className="mt-2 text-zinc-600 dark:text-zinc-300">{subtitle}</p>}
            </motion.div>

            {children}
        </section>
    );
}
