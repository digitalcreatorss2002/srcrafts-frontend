import {z} from "zod";

export const contactSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    subject: z.string().min(1, "Select a category"),
    message: z.string().min(10, "Message is too short"),
  });
