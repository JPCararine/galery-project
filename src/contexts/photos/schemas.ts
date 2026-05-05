import {z} from "zod";

export const photoNewFormSchema = z.object({
    title: z.string().min(1, { message: "Campo obrigatório"}).max(255),
    file: z.instanceof(FileList).refine((file) => file.length > 0, { message: "Campo obrigatório"}),
    albumsIds: z.array(z.string().uuid()).optional(),
});

export interface UpdatePhotoFormSchema {
    albumsIds?: string[];
}

export const updatePhotoFormSchema = z.object({
    albumsIds: z.array(z.string().uuid()),
});

export type PhotoNewFormSchema = z.infer<typeof photoNewFormSchema>;
export type UUpdatePhotoFormSchema = z.infer<typeof updatePhotoFormSchema>;