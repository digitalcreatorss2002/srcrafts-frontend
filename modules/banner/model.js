import { z } from "zod";

export const BannerSchema = z.object({
  _id: z.string(),
  // Transform handles the local path backslashes to ensure browser compatibility
  image: z.string().transform((val) => val.replace(/\\/g, "/")),
  link: z.string().startsWith("/"),
});

export const BannerArraySchema = z.array(BannerSchema);