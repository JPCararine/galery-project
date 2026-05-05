import type { Album } from "../models/album";
import Text from "../../../components/text";
import React from "react";
import Button from "../../../components/button";
import cx from "classnames";
import Skeleton from "../../../components/skeleton";
import usePhotos from "../../photos/hooks/use-photos";
import useAlbums from "../hooks/use-albums";
import { useNavigate } from "react-router";

interface AlbumsFilterProps extends React.ComponentProps<"div">{
    albums: Album[];
    loading?: boolean;
    selectedAlbumId?: string;
    onSelectedAlbum?: (albumId: string) => void;
    
}




export default function AlbumsFilter({ onSelectedAlbum,selectedAlbumId, albums, loading, className, ...props }: AlbumsFilterProps) {
    const {filters} = usePhotos();
    const {deleteAlbum} = useAlbums();
    const [error, setError] = React.useState<string | null>(null);
    const [openedMenu, setOpenedMenu] = React.useState<string | null>(null);
    const navigate = useNavigate();

    
    function handleDeleteAlbum() {
            if(!filters.albumId) {
                setError("Nenhum álbum selecionado");
                return;
            }

            
            setError(null);
            deleteAlbum(filters.albumId);
            filters.setAlbumId(null);
            navigate("/");
        
    }
    return (
        <div className={cx("flex items-center gap-3.5", className)} {...props}>
                <Text variant="heading-small">Álbuns</Text>
                <div className="flex gap-3">
                {!loading ? (
                    <>
                    <Button variant={filters.albumId === null ? "primary" : "ghost"} size="sm" className="cursor-pointer" onClick={() => filters.setAlbumId(null)}>
                        Todos
                    </Button>
                {albums.map((album) => (
                    <div key={album.id} className="group/album relative flex items-center gap-1">
                        <div className="flex items-center gap-1">
                    <Button  variant={filters.albumId === album.id ? "primary" : "ghost"} size="sm" className="cursor-pointer" onClick={() => {filters.setAlbumId(album.id); setOpenedMenu(null)}}>
                        {album.title}
                    </Button>
                    {filters.albumId === album.id && (
                        <button
                            className="px-2 text-white cursor-pointer items-center"
                            onClick={() =>
                                setOpenedMenu(
                                    openedMenu === album.id ? null : album.id)
                            }
                        >
                            ⋮
                        </button>
                    )}
                    </div>
                    
                    
                                {openedMenu === album.id && (
                        <div className="absolute top-full right-0 mt-1 rounded border">
                            <Button
                                variant="destructive"
                                size="sm"
                                className="text-accent-red "
                                onClick={() => deleteAlbum(album.id)}
                            >
                                Excluir
                            </Button>
            </div>
        )}
                    </div>
                ))}
                </>
                ) : (
                    Array.from({length: 5}).map((_, index) => <Skeleton className="w-28 h-7" key={`album-button-loading-${index}`}/>)
                )
            }
                
                
                </div>
                
                

            
        </div>
    )
}