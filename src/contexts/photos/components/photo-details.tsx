import type { Photo } from "../models/photos";
import Text, { textVariants } from "../../../components/text";
import Button from "../../../components/button";
import React from "react";
import ImageFilePreview from "../../../components/image-file-preview";

import Skeleton from "../../../components/skeleton";
import PhotosNavigator from "./photos-navigator";
import AlbumsListSelectable from "../../albums/components/albums-list-selectable";

interface PhotoDetailsProps extends React.ComponentProps<"div"> {
    photo: Photo;
    loading?: boolean;
}

export default function PhotoDetails({photo, loading}:PhotoDetailsProps) {
    const [selectedAlbums, setSelectedAlbums] = React.useState<string[]>([]);


    function handleDeleteFromAlbums() {
        const albumsIds = photo.albums?.filter((album) =>  !selectedAlbums.includes(album.id)).map((album) => album.id);


        console.log("Enviando pro backend", albumsIds); 
        setSelectedAlbums([]);
    }
    return (
        <div>
            <header className="flex items-center justify-between gap-8 mb-8">
                {!loading ? (
            <Text as="h2" variant="heading-large">{photo.title}</Text>
                ) : (
                    <Skeleton className="w-48 h-8" />
                )}
                <PhotosNavigator />
            </header>
            <div className="grid grid-cols-[21rem_1fr] gap-24">
                <div className="space-y-6">
                    {!loading ? (
                <ImageFilePreview
                            src={`/images/${photo.imageId}`}
                            title={photo.title}
                            imageClassName="h-[21rem] rounded-lg"
                            />
                ) : (
                    <Skeleton className="h-[21rem]" />
                )}
                {!loading ? (
                <Button variant="destructive" onClick={handleDeleteFromAlbums}>Excluir foto de álbuns selecionados</Button>
                ) : (
                    <Skeleton className="w-20 h-10" />
                )}
                </div>
                <div className="py-3">
                    <Text as="h3" variant="heading-medium" className="mb-6">Álbuns</Text>
                    <AlbumsListSelectable photo={photo} selectedAlbums={selectedAlbums} setSelectedAlbums={setSelectedAlbums} />
                </div>
            </div>
        </div> 
    )
}