import Text from "../components/text";
import { useParams } from "react-router";

export default function PagePhotoDetails() {
    const {id} = useParams();
    return <>
        <Text variant="heading-medium">Detalhes da Foto</Text>
        <hr />
        <Text variant="paragraph-medium">ID da foto: {id}</Text>
    </>
}