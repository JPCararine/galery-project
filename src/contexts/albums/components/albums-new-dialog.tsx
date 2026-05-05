import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader } from "../../../components/dialog";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import Button from "../../../components/button";
import SelectCheckBoxIllustration from "../../../assets/images/select-checkbox.svg?react";
import Skeleton from "../../../components/skeleton";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";

import usePhotos, { useAllPhotos } from "../../photos/hooks/use-photos";
import useAlbums from "../hooks/use-albums";
import { createAlbumFormSchema, type CreateAlbumFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";

interface AlbumsNewDialogProps {
trigger: React.ReactNode;

}


export default function AlbumsNewDialog({trigger}: AlbumsNewDialogProps) {
    const {photos, isLoadingPhotos} = useAllPhotos();
    const form = useForm<CreateAlbumFormSchema>({
        resolver: zodResolver(createAlbumFormSchema)
    });
    const [modalOpen, setModalOpen] = React.useState(false);
    const { albums ,createAlbum } = useAlbums();
    const [isCreatingAlbum, setIsCreatingAlbum] = React.useTransition();
    const originalAlbumsTitles = React.useMemo(
        () => albums?.map(album => album.title.toLowerCase()),
        [albums]
    );


    React.useEffect(() => {
        if(!modalOpen) {
            form.reset();
        }
    }, [modalOpen, form]);  

    function handleTogglePhoto( photoId: string) {
        const photosIds = form.getValues("photoIds");
        const photosSet = new Set(photosIds || []);

        if(photosSet.has(photoId)) {
            photosSet.delete(photoId);
        } else {
            photosSet.add(photoId);
        }
        form.setValue("photoIds", Array.from(photosSet));
    }
    function handleSubmit(payload: CreateAlbumFormSchema) {
        const isOriginalAlbum = originalAlbumsTitles.includes(payload.title.toLowerCase());

        if(isOriginalAlbum) {
            form.setError("title", {
                message: "Já existe um álbum com esse título"
            });

            return;
        }
        setIsCreatingAlbum(async () => {
            await createAlbum(payload);
            setModalOpen(false);
        });
    }
    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
             <DialogTrigger asChild>{trigger}</DialogTrigger>   
                <DialogContent>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogHeader>Criar Álbum</DialogHeader>
                    <DialogBody className="flex flex-col gap-5">
                    <InputText error={form.formState.errors.title?.message} {...form.register("title")} placeholder="Adicione um título" maxLength={255} />
                    <div className="space-y-3">
                        <Text as="div" variant="label-small">Fotos cadastradas</Text>

                        {!isLoadingPhotos && photos.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {photos.map((photo) => (
                                    <PhotoImageSelectable
                                    key={photo.id}
                                    src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                                    title={photo.title} 
                                    imageClassName="w-20 h-20" 
                                    onSelectImage={() => handleTogglePhoto(photo.id)}
                                    />
                                ))}
                            </div>
                        )}
                        {isLoadingPhotos && (
                            <div className="flex flex-wrap gap-2">
                                {Array.from({length: 4}).map((_, index) => (
                                    <Skeleton key={`photo-album-loading-${index}`} 
                                    className="w-20 h-20 rounded-lg" />
                                ))}
                            </div>
                        )}
                        {!isLoadingPhotos && photos.length === 0 && (
                            <div className="w-full flex flex-col justify-center items-center gap-3">
                                <SelectCheckBoxIllustration />
                                <Text variant="paragraph-medium" className="text-center">
                                    Nenhuma foto disponível para seleção.
                                </Text>
                            </div>
                            )}


                    </div>
                    </DialogBody>
                <DialogFooter>
                    
                    <DialogClose asChild>
                    <Button variant="secondary" disabled={isCreatingAlbum}>Cancelar</Button>
                    </DialogClose>
                    <Button disabled={isCreatingAlbum} handling={isCreatingAlbum} type="submit">{isCreatingAlbum ? "Adicionando..." : "Adicionar"}</Button>

                </DialogFooter>
                </form>
                </DialogContent>
                


        </Dialog>
    )

}