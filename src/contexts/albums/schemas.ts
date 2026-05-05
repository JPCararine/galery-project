import {z} from "zod";

export const createAlbumFormSchema = z.object({
    title: z.string().min(1, { message: "Campo obrigatório"}).max(255),
    photoIds: z.array(z.string().uuid()).optional(),
});
export type CreateAlbumFormSchema = z.infer<typeof createAlbumFormSchema>;