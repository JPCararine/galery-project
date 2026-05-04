import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader } from "../../../components/dialog";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import Button from "../../../components/button";
import SelectCheckBoxIllustration from "../../../assets/images/select-checkbox.svg?react";
import Skeleton from "../../../components/skeleton";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";

import usePhotos from "../../photos/hooks/use-photos";

interface AlbumsNewDialogProps {
trigger: React.ReactNode;

}


export default function AlbumsNewDialog({trigger}: AlbumsNewDialogProps) {
    const {photos, isLoadingPhotos} = usePhotos();
    function handleTogglePhoto(selected: boolean, photoId: string) {
        console.log(selected, photoId);
    }
    return (
        <Dialog>
             <DialogTrigger asChild>{trigger}</DialogTrigger>   
                <DialogContent>
                    <DialogHeader>Criar Álbum</DialogHeader>
                    <DialogBody className="flex flex-col gap-5">
                    <InputText placeholder="Adicione um título" maxLength={255} />
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
                                    onSelectImage={(selected) => handleTogglePhoto(selected, photo.id)}
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
                    <Button variant="secondary">Cancelar</Button>
                    </DialogClose>
                    <Button>Adicionar</Button>

                </DialogFooter>

                </DialogContent>
                


        </Dialog>
    )

}