type Lang = "en" | "es";

export const SITE_URL = "https://jagoba.dev";
export const PERSON_NAME = "Jagoba Inda";
export const PERSON_EMAIL = "contact@jagoba.dev";
export const PERSON_IMAGE = `${SITE_URL}/imgs/favicon/og-image.png`;

const SAME_AS = ["https://github.com/jagobainda", "https://www.linkedin.com/in/jagoba-inda-49a2aa2ab/"];

const JOB_TITLE: Record<Lang, string> = {
    es: "Desarrollador Full Stack",
    en: "Full Stack Developer",
};

const HOME_LABEL: Record<Lang, string> = {
    es: "Inicio",
    en: "Home",
};

/** Stable @id so other schemas can reference the same Person node. */
const PERSON_ID = `${SITE_URL}/#person`;

const inLanguage = (lang: Lang): string => (lang === "en" ? "en-US" : "es-ES");

export const homeUrl = (lang: Lang): string => (lang === "en" ? `${SITE_URL}/en` : `${SITE_URL}/`);

export const projectUrl = (lang: Lang, slug: string): string =>
    lang === "en" ? `${SITE_URL}/en/projects/${slug}` : `${SITE_URL}/projects/${slug}`;

const personSchema = (lang: Lang) => ({
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME,
    jobTitle: JOB_TITLE[lang],
    url: SITE_URL,
    email: PERSON_EMAIL,
    image: PERSON_IMAGE,
    sameAs: SAME_AS,
});

const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
    })),
});

/** JSON-LD for the home page: a ProfilePage whose main entity is the Person. */
export const homeStructuredData = ({ lang, description }: { lang: Lang; description: string }) => ({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: homeUrl(lang),
    inLanguage: inLanguage(lang),
    description,
    mainEntity: personSchema(lang),
});

/** JSON-LD for a project detail page: the work itself plus its breadcrumb trail. */
export const projectStructuredData = ({
    lang,
    slug,
    name,
    description,
    sourceUrl,
}: {
    lang: Lang;
    slug: string;
    name: string;
    description: string;
    sourceUrl?: string;
}) => {
    const url = projectUrl(lang, slug);

    const work = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name,
        description,
        url,
        inLanguage: inLanguage(lang),
        author: { "@type": "Person", "@id": PERSON_ID, name: PERSON_NAME },
        ...(sourceUrl ? { sameAs: [sourceUrl] } : {}),
    };

    const breadcrumb = breadcrumbSchema([
        { name: HOME_LABEL[lang], url: homeUrl(lang) },
        { name, url },
    ]);

    return [work, breadcrumb];
};
