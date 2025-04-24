import { z } from "zod";

const textBlock = z.object({
	type: z.literal("text"),
	value: z.string(), // markdown supported
});

const imageBlock = z.object({
	type: z.literal("image"),
	url: z.string().url(), // uploaded to S3
	alt: z.string().optional(),
	size: z.enum(["small", "medium", "large"]).default("medium"),
});

const videoBlock = z.object({
	type: z.literal("video"),
	youtubeUrl: z.string().url(), // YouTube embed
});

const carouselBlock = z.object({
	type: z.literal("carousel"),
	images: z.array(
		z.object({
			url: z.string().url(),
			alt: z.string().optional(),
		}),
	),
});

const textImageBlock = z.object({
	type: z.literal("text-image"),
	text: z.string(), // markdown
	image: z.object({
		url: z.string().url(),
		alt: z.string().optional(),
	}),
	imagePosition: z.enum(["left", "right"]), // for layout control
});

export const contentBlockSchema = z.union([
	textBlock,
	imageBlock,
	videoBlock,
	carouselBlock,
	textImageBlock,
]);

export const postContentSchema = z.array(contentBlockSchema);
