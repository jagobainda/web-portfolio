import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { defineCollection } from "astro/content/config";

const projectLinkSchema = z.object({
    text: z.string(),
    url: z.url(),
    icon: z.string(),
});

const projectSchema = z.object({
    name: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    links: z.array(projectLinkSchema),
    detailsUrl: z.string().optional(),
});

const projectsCollection = defineCollection({
    loader: glob({ pattern: '*.json', base: 'src/content/projects' }),
    schema: z.object({
        tabNames: z.object({
            personal: z.string(),
            work: z.string(),
            student: z.string(),
        }),
        personal: z.array(projectSchema),
        work: z.array(projectSchema),
        student: z.array(projectSchema),
    }),
});

const experienceItemSchema = z.object({
    position: z.string(),
    company: z.string(),
    location: z.string(),
    period: z.string(),
    responsibilities: z.array(z.string()),
    technologies: z.array(z.string()),
    icon: z.string(),
});

const experienceCollection = defineCollection({
    loader: glob({ pattern: '*.json', base: 'src/content/experience' }),
    schema: z.object({
        experiences: z.array(experienceItemSchema),
    }),
});

const aboutSectionSchema = z.object({
    title: z.string(),
    content: z.string(),
    icon: z.string(),
});

const aboutCollection = defineCollection({
    loader: glob({ pattern: '*.json', base: 'src/content/about' }),
    schema: z.object({
        intro: z.string(),
        sections: z.array(aboutSectionSchema),
        quote: z.string().optional(),
        date: z.string(),
    }),
});

const techItemSchema = z.object({
    icon: z.string(),
    name: z.string(),
});

const technologiesCollection = defineCollection({
    loader: glob({ pattern: '*.json', base: 'src/content/technologies' }),
    schema: z.object({
        technologies: z.array(techItemSchema),
        programmingTools: z.array(techItemSchema),
        operatingSystems: z.array(techItemSchema),
    }),
});

const uiCollection = defineCollection({
    loader: glob({ pattern: '*.json', base: 'src/content/ui' }),
    schema: z.object({
        contactTitle: z.string(),
        emailText: z.string(),
        linkedinText: z.string(),
        githubText: z.string(),
        resumeText: z.string(),
        projectsTitle: z.string(),
        technologiesTitle: z.string(),
        experienceTitle: z.string(),
        aboutMeTitle: z.string(),
        techTabs: z.object({
            technologies: z.string(),
            programs: z.string(),
            os: z.string(),
        }),
        buttons: z.object({
            projects: z.string(),
            technologies: z.string(),
            experience: z.string(),
            aboutMe: z.string(),
        }),
        viewDetails: z.string(),
    }),
});

const projectDetailsCollection = defineCollection({
    loader: glob({ pattern: '*.json', base: 'src/content/project-details' }),
    schema: z.object({
        // Extension specific
        backButton: z.string(),
        usageStats: z.string().optional(),
        technologies: z.string().optional(),
        links: z.string().optional(),
        avgDailyRequests3m: z.string().optional(),
        totalRequests3m: z.string().optional(),
        avgDailyRequests1m: z.string().optional(),
        totalRequests1m: z.string().optional(),
        requestsGrowthRate: z.string().optional(),
        maxRequestsInADay: z.string().optional(),
        lastUpdated: z.string().optional(),
        requests: z.string().optional(),
        // SkinHolder specific
        title: z.string().optional(),
        subtitle: z.string().optional(),
        whatIs: z.string().optional(),
        whatIsDescription: z.string().optional(),
        features: z.string().optional(),
        feature1: z.string().optional(),
        feature2: z.string().optional(),
        feature3: z.string().optional(),
        feature4: z.string().optional(),
        feature5: z.string().optional(),
        architecture: z.string().optional(),
        architectureDesc: z.string().optional(),
        madeBy: z.string().optional(),
        platforms: z.string().optional(),
        platformWeb: z.string().optional(),
        platformDesktop: z.string().optional(),
        platformMobile: z.string().optional(),
        platformApi: z.string().optional(),
        // Web Portfolio specific
        description: z.string().optional(),
        techStack: z.string().optional(),
        techAstro: z.string().optional(),
        techTypeScript: z.string().optional(),
        techTailwind: z.string().optional(),
        techAnime: z.string().optional(),
        techZod: z.string().optional(),
        archAstroPages: z.string().optional(),
        archAstroPagesDesc: z.string().optional(),
        archContentCollections: z.string().optional(),
        archContentCollectionsDesc: z.string().optional(),
        archTailwindStyles: z.string().optional(),
        archTailwindStylesDesc: z.string().optional(),
        archHybridRendering: z.string().optional(),
        archHybridRenderingDesc: z.string().optional(),
        archCloudflare: z.string().optional(),
        archCloudflareDesc: z.string().optional(),
        designPhilosophy: z.string().optional(),
        designDesc: z.string().optional(),
        designSimplicity: z.string().optional(),
        designSimplicityDesc: z.string().optional(),
        designImmediateAccess: z.string().optional(),
        designImmediateAccessDesc: z.string().optional(),
        stackPhilosophy: z.string().optional(),
        stackDesc: z.string().optional(),
        stackPerformance: z.string().optional(),
        stackPerformanceDesc: z.string().optional(),
        stackDX: z.string().optional(),
        stackDXDesc: z.string().optional(),
        stackStyles: z.string().optional(),
        stackStylesDesc: z.string().optional(),
        sourceCode: z.string().optional(),
        liveDemo: z.string().optional(),
        // LostieLauncher specific
        featureLibrary: z.string().optional(),
        featureDownloads: z.string().optional(),
        featureKeys: z.string().optional(),
        featureMyGames: z.string().optional(),
        featureUpdates: z.string().optional(),
        featureNews: z.string().optional(),
        featureThemes: z.string().optional(),
        featureLanguages: z.string().optional(),
        featureTray: z.string().optional(),
        featureStartup: z.string().optional(),
        techWpf: z.string().optional(),
        techMvvm: z.string().optional(),
        techDI: z.string().optional(),
        techSharpCompress: z.string().optional(),
        techVelopack: z.string().optional(),
        techIconPacks: z.string().optional(),
        infrastructure: z.string().optional(),
        infrastructureDesc: z.string().optional(),
        infraCatalog: z.string().optional(),
        infraCatalogDesc: z.string().optional(),
        infraNotifications: z.string().optional(),
        infraNotificationsDesc: z.string().optional(),
        infraInstaller: z.string().optional(),
        infraInstallerDesc: z.string().optional(),
        infraUpdates: z.string().optional(),
        infraUpdatesDesc: z.string().optional(),
        cicd: z.string().optional(),
        cicdDesc: z.string().optional(),
        cicdBuild: z.string().optional(),
        cicdBuildDesc: z.string().optional(),
        cicdSign: z.string().optional(),
        cicdSignDesc: z.string().optional(),
        cicdPackage: z.string().optional(),
        cicdPackageDesc: z.string().optional(),
        cicdRelease: z.string().optional(),
        cicdReleaseDesc: z.string().optional(),
        cicdDeploy: z.string().optional(),
        cicdDeployDesc: z.string().optional(),
    }),
});

export const collections = {
    projects: projectsCollection,
    experience: experienceCollection,
    about: aboutCollection,
    technologies: technologiesCollection,
    ui: uiCollection,
    'project-details': projectDetailsCollection,
};

