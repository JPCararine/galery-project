import Container from "../components/container"
import PhotoWidget from "../contexts/photos/components/photo-widget"
import PhotosList from "../cors-components/photos-list"

export default function PageHome() {
    return (
    <Container>
        <PhotosList photos={[
            {
                id: "123",
                title: "Olá mundo!",
                imageId: "portrait-tower.png",
                albums: [
                    {id: "123", title: "Album 1"},
                    {id: "345", title: "Album 2"},
                    {id: "678", title: "Album 3"}
                ]
            }
        ]}/>
    </Container>
    )
}