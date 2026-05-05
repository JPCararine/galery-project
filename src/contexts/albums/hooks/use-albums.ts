import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Album } from "../models/album";
import {api, fetcher} from "../../../helpers/api";
import { createAlbumFormSchema, type CreateAlbumFormSchema } from "../schemas";
import { toast } from "sonner";



export default function useAlbums() {
    const {data, isLoading} = useQuery<Album[]>({
        queryKey: ["albums"],
        queryFn: () => fetcher("/albums"),
    });
    const queryClient = useQueryClient();

    async function createAlbum(payload: CreateAlbumFormSchema) {
        try{
          await api.post<Album>("/albums", {
            title: payload.title,
            photoIds: payload.photoIds
          });
        
          await queryClient.invalidateQueries({queryKey: ["albums"]});
          await queryClient.invalidateQueries({queryKey: ["photos"]});
          toast.success("Álbum criado com sucesso!");
    } catch(error) {
        toast.error("Erro ao criar álbum");
        throw error;
    }
}
    async function deleteAlbum(albumId: string) {
        try{ 
        await api.delete(`/albums/${albumId}`);
        await queryClient.invalidateQueries({queryKey: ["albums"]});
        await queryClient.invalidateQueries({queryKey: ["photos"]});
        toast.success("Álbum deletado com sucesso!");
    } catch(error) {
        toast.error("Erro ao deletar álbum");
        throw error;
    }
}

    return {
        albums: data || [],
        isLoadingAlbums: isLoading,
        createAlbum,
        deleteAlbum,
    };
}