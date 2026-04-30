import Text from "../components/text";
import { useParams } from "react-router";
import PhotoDetails from "../contexts/photos/components/photo-details";
import {albums, photos} from "../mocks/gallery-data";
import Container from "../components/container";

export default function PagePhotoDetails() {
    const { id } = useParams();
    const photo = photos.find(photo => photo.id === id);

    if (!photo) {
    return <div>Foto não encontrada</div>;
    }
    return <Container>
        <PhotoDetails photo={photo} />
        </Container>
}