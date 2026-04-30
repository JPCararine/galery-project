import { InputCheckbox } from "../../../components/input-checkbox";
import type { Photo } from "../../photos/models/photos";
import Text from "../../../components/text";
import Divider from "../../../components/divider";
import Skeleton from "../../../components/skeleton";
import React from "react";



interface AlbumsListSelectableProps {
    loading?: boolean;
    photo: Photo;
    selectedAlbums: string[];
    setSelectedAlbums: React.Dispatch<
        React.SetStateAction<string[]>>;
    
}

export default function AlbumsListSelectable({loading, photo, selectedAlbums, setSelectedAlbums}: AlbumsListSelectableProps) {
    

    function handleSelectAlbum(albumId: string) {
    setSelectedAlbums((prev) =>
        prev.includes(albumId)
            ? prev.filter(id => id !== albumId)
            : [...prev, albumId]
    );
    }
    
    return (
        <ul className="flex flex-col gap-4">
            {!loading && photo.albums?.length > 0 &&
            photo.albums.map((album, index) => (
                        <li key={album.id}>
            <div className="flex items-center justify-between gap-1">
                <Text variant="paragraph-large" className="truncate">
                    {album.title}
                </Text>
                <InputCheckbox checked={selectedAlbums.includes(album.id)} onClick={() => {handleSelectAlbum(album.id)}}/>
            </div>
            {index !== photo.albums.length -1 && <Divider className="mt-4" />}
            </li>
            ))}
            {loading && 
            Array.from({length: 5}).map((_, index) => (
            <li key={`photo-albums-loading-${index}`}>
                <Skeleton className="h-[2.5rem]" />
            </li>
            ))} 
        </ul>
        
    );
}
