import React from "react";
import Text from "./text";
import Button from "./button";


export function Album() {
    const [albums, setAlbums] = React.useState<string[]>(["Viagem", "Natureza", "Animais"]);
    return (
        <div className="flex flex-col">
            <Text variant="heading-small">Selecionar álbum</Text>
            <div className="border border-solid border-border-primary rounded mt-3 ">
                <div>
                    {albums.map((album) => (
                        <Button key={album} className="px-4 py-3 hover:bg-border-primary cursor-pointer">
                            <Text variant="paragraph-medium">{album}</Text>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}