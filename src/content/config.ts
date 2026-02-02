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

export const collections = {
    projects: projectsCollection,
    experience: experienceCollection,
    about: aboutCollection,
    technologies: technologiesCollection,
};