
import Text from "../../../components/text";
import React from "react";
import {updatePhotoFormSchema, type PhotoNewFormSchema, type UUpdatePhotoFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAlbums from "../../albums/hooks/use-albums";
import Skeleton from "../../../components/skeleton";
import Button from "../../../components/button";
import { Dialog, DialogTrigger } from "../../../components/dialog";
import { DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader } from "../../../components/dialog";
import usePhoto from "../hooks/use-photo";
import usePhotos from "../hooks/use-photos";
import type { Album } from "../../albums/models/album";

interface PhotoPutOnAlbumProps {
    photoId: string;
    trigger: React.ReactNode;
   
}

export function PhotoPutOnAlbum({photoId, trigger}: PhotoPutOnAlbumProps) {
            const {filters} = usePhotos();
            const [modalOpen, setModalOpen] = React.useState(false);
            const form = useForm<UUpdatePhotoFormSchema>({
                resolver: zodResolver(updatePhotoFormSchema)
            });
            const {albums, isLoadingAlbums} = useAlbums();
            const { photo,putPhotoOnAlbum } = usePhoto(photoId);
            const [isCreatingPhoto, setIsCreatingPhoto] = React.useTransition();
            const originalAlbumsIds = React.useMemo(
                () => photo?.albums?.map(album => album.id) || [],
                [photo]
            );
        
        
            const albumsIds = form.watch("albumsIds");
        
            React.useEffect(() => {
                if(modalOpen && photo) {
                    form.setValue("albumsIds", photo.albums?.map(album => album.id) || []);
                };

                if(!modalOpen) {
                    form.reset();
                }
        }, [modalOpen, photo, form]);
        
            function handleToggleAlbum(albumId: string) {
                const albumsIds = form.getValues("albumsIds");
                const albumsSet = new Set(albumsIds || []);

                const isOriginalAlbum = originalAlbumsIds.includes(albumId);

                if (albumsSet.has(albumId) && isOriginalAlbum) {
                        return;
                }
        
                if(albumsSet.has(albumId)) {
                    albumsSet.delete(albumId);
                } else {
                    albumsSet.add(albumId);
                }
        
                form.setValue("albumsIds", Array.from(albumsSet));
            }

            
            function handleSubmit() {
                    setIsCreatingPhoto(async () => {
                        await putPhotoOnAlbum(photoId, form.getValues());
                        setModalOpen(false);
                    });
                }
            return (
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogTrigger asChild>{trigger}</DialogTrigger>
					<DialogContent>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <DialogBody className="flex flex-col gap-5">
                                <div className="space-y-3">
                                        <Text variant="label-small">Selecionar álbuns</Text>
                                        <div className="flex flex-wrap gap-3 mt-3">
                                        {!isLoadingAlbums && albums.length > 0 && albums.map(album =>
                                            <Button type="button" size="sm" className="truncate" variant={filters.albumId === null && albumsIds?.includes(album.id) ? "primary" : "ghost"} key={album.id} onClick={() => {handleToggleAlbum(album.id); filters.setAlbumId(null)}}>{album.title}</Button>
                                        )
                                    }
                                    {isLoadingAlbums && Array.from({length: 5}).map((_, index) => 
                                        <Skeleton className="w-20 h-7" key={`albums-loading-dialog-${index}`} />
                                    )}
                                    </div>
                                    </div>
                                    </DialogBody>
                                    <DialogFooter>
                                    <DialogClose asChild>
                                    <Button variant="secondary" disabled={isCreatingPhoto}>Cancelar</Button>
                                    </DialogClose>
                                    <Button disabled={isCreatingPhoto} handling={isCreatingPhoto} type="submit">{isCreatingPhoto ? "Adicionando..." : "Adicionar"}</Button>
                                    </DialogFooter>
                                    </form>
                                    </DialogContent>
                                    </Dialog>
                                    
    )
}