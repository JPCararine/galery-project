import Container from "../components/container"
import PhotoWidget from "../contexts/photos/components/photo-widget"
import AlbumsList from "../contexts/albums/components/albums-filter"
import PhotosList from "../cors-components/photos-list"
import {albums, photos} from "../mocks/gallery-data";

export default function PageHome() {
    return (
    <Container>
        <AlbumsList className="mb-9" albums={albums}/>
        <PhotosList photos={photos}/>
    </Container>
    )
}