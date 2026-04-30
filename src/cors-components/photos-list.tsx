import PhotoWidget from "../contexts/photos/components/photo-widget";
import type { Photo } from "../contexts/photos/models/photos";
import Text from "../components/text";
import Skeleton from "../components/skeleton";
import AlbumsList  from "../contexts/albums/components/albums-filter";

interface PhotosListProps {
    photos: Photo[];
    loading?: boolean;
}


export default function PhotosList({ photos, loading }: PhotosListProps) {
  return (
    <div className="space-y-6">
      <Text as="div" variant="paragraph-large" className="flex items-center justify-end gap-1 text-accent-span">
        Total:{" "}
        {!loading ? <div>{photos.length}</div> : <Skeleton className="w-6 h-6" />}
      </Text>

      {(loading || photos.length > 0) && (
        <div className="grid grid-cols-5 gap-9">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <PhotoWidget key={`photo-loading-${index}`} photo={{} as Photo} loading />
              ))
            : photos.map((photo) => (
                <PhotoWidget key={photo.id} photo={photo} />
              ))}
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <Text variant="paragraph-large">Nenhuma foto encontrada</Text>
        </div>
      )}
    </div>
    
  );
}