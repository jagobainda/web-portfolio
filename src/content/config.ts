import { defineCollection, z } from 'astro:content';

const projectLinkSchema = z.object({
    text: z.string(),
    url: z.string().url(),
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
    type: 'data',
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
    type: 'data',
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
    type: 'data',
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
    type: 'data',
    schema: z.object({
        technologies: z.array(techItemSchema),
        programmingTools: z.array(techItemSchema),
        operatingSystems: z.array(techItemSchema),
    }),
});

const uiCollection = defineCollection({
    type: 'data',
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
    type: 'data',
    schema: z.object({
        backButton: z.string(),
        usageStats: z.string().optional(),
        technologies: z.string(),
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