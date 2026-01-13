export const profile = {
    name: "Wentao Luo",
    nameZh: "罗文韬",
    school: "Southern University of Science and Technology (SUSTech)",
    college: "Zhicheng College",
    gpa: "3.79 / 4.0",
    rank: "42 / 150",
    email: "12313616@mail.sustech.edu.cn",
    phone: "+86 17267521520",
    github: "https://github.com/Kabukimono-Sakura",
    resume: "/files/resume.pdf",
    avatar: "/Alysia.png",
    portrait: "/Me.png",

    research: {
        advisor: "Prof. Qi Hao",
        org: "SUSTech",

        // 方案一：public/ 下的资源，直接用站点根路径引用
        // 你现在的文件名是 public/files/Report.pdf 和 public/files/Slides.pptx
        reportUrl: "/files/Report.pdf",
        slidesUrl: "/files/Slides.pptx",

        // 可视化预览图：放在 public/thumbs/ 下
        // 例如：public/thumbs/report.png, public/thumbs/slides.png
        reportThumb: "/thumbs/Report.png",
        slidesThumb: "/thumbs/Slides.png",

        figureUrl: "/research/framework.png"
    },

    heroCards: {
        advisor: {
            line1: "南方科技大学教授",
            line2: "计算机学院副院长",
            name: "郝祁",
        },
        certificates: ["CET-4", "CET-6"],
        honors: [
            "全国数学建模大赛广东省一等奖",
            "MCM Successful Participant",
            "(As the Team Leader)",
            "2025年南科大优秀学生",
        ],
    },

    projects: [
        {
            id: "closed-loop",
            category: "autonomy",
            titleKey: "projects.items.closedLoop.title",
            descKey: "projects.items.closedLoop.desc",
            tags: ["CARLA", "Closed-loop", "Diagnostics", "Reproducibility"],
            repo: "",
        },
        {
            id: "ai",
            category: "ai",
            titleKey: "projects.items.ai.title",
            descKey: "projects.items.ai.desc",
            tags: ["Deep Learning", "RL", "NLP"],
            repo: "",
        },
        {
            id: "systems",
            category: "systems",
            titleKey: "projects.items.systems.title",
            descKey: "projects.items.systems.desc",
            tags: ["Networking", "System Design", "Engineering"],
            repo: "",
        },
    ] as const,
};
