import type { Photo } from "../models/photos";
import Text from "../../../components/text";
import Button from "../../../components/button";
import React from "react";
import ImageFilePreview from "../../../components/image-file-preview";
import Skeleton from "../../../components/skeleton";
import PhotosNavigator from "./photos-navigator";
import AlbumsListSelectable from "../../albums/components/albums-list-selectable";
import usePhoto from "../hooks/use-photo";
import { useNavigate, useParams } from "react-router";
import { PhotoPutOnAlbum } from "./photo-put-on-album";





export default function PhotoDetails() {
    const [selectedAlbums, setSelectedAlbums] = React.useState<string[]>([]);
    const { id } = useParams();
    const {updatePhoto, deletePhoto} = usePhoto(id);
    const navigate = useNavigate();
        const { photo, previousPhotoId, nextPhotoId, isLoadingPhoto } = usePhoto(id);
        if (!photo) {
        return <div>Foto não encontrada</div>;
        }
   

    function handleDeleteFromAlbums() {
        if(!photo || !id) return;
        const albumsIds = photo?.albums?.filter((album) =>  !selectedAlbums.includes(album.id)).map((album) => album.id);


        updatePhoto(id, {
            albumsIds
        });
        setSelectedAlbums([]);
    }
    function handleDeletePhoto() {
        if(!id) return;

        deletePhoto(id);
        navigate("/");
    }
    return (
        <div>
            <header className="flex items-center justify-between gap-8 mb-8">
                {!isLoadingPhoto ? (
            <Text as="h2" variant="heading-large">{photo?.title}</Text>
                ) : (
                    <Skeleton className="w-48 h-8" />
                )}
                <PhotosNavigator previousPhotosId={previousPhotoId} nextPhotoId={nextPhotoId} loading={isLoadingPhoto} />
            </header>
            <div className="grid grid-cols-[21rem_1fr] gap-24">
                <div className="space-y-6">
                    {!isLoadingPhoto ? (
                <ImageFilePreview
                            src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
                            title={photo?.title}
                            imageClassName="h-[21rem] rounded-lg"
                            />
                ) : (
                    <Skeleton className="h-[21rem]" />
                )}
                {!isLoadingPhoto ? (
                <>
                
                <PhotoPutOnAlbum photoId={id as string} trigger={<Button variant="primary">Adicionar/Remover álbuns</Button>} />
                {photo.albums?.length > 0 && (
                <Button variant="destructive" onClick={handleDeleteFromAlbums}>Excluir foto de álbuns selecionados</Button>
                )}
                <Button variant="destructive" onClick={handleDeletePhoto}>Excluir foto</Button>
                </>
                ) : (
                    <Skeleton className="w-20 h-10" />
                )}
                </div>
                <div className="py-3">
                    <Text as="h3" variant="heading-medium" className="mb-6">Álbuns</Text>
                    <AlbumsListSelectable photo={photo as Photo} selectedAlbums={selectedAlbums} setSelectedAlbums={setSelectedAlbums} />
                </div>
            </div>
        </div> 
    )
}

