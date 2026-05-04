import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Alert from "../../../components/alert";
import Button from "../../../components/button";
import ImageFilePreview from "../../../components/image-file-preview";
import InputSingleFile from "../../../components/input-single-file";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import Skeleton from "../../../components/skeleton";
import { useForm } from "react-hook-form";
import { DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader } from "../../../components/dialog";
import useAlbums from "../../albums/hooks/use-albums";
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import usePhotos from "../hooks/use-photos";
import usePhoto from "../hooks/use-photo";
interface PhotoNewDialogProps {
    trigger: React.ReactNode;
    
}

export default function PhotoNewDialog({trigger}: PhotoNewDialogProps) {
	const [modalOpen, setModalOpen] = React.useState(false);
	const form = useForm<PhotoNewFormSchema>({
		resolver: zodResolver(photoNewFormSchema)
	});
	const {albums, isLoadingAlbums} = useAlbums();
	const { createPhoto } = usePhoto();
	const [isCreatingPhoto, setIsCreatingPhoto] = React.useTransition();

	const file = form.watch("file");
	const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

	const albumsIds = form.watch("albumsIds");

	React.useEffect(() => {
		if(!modalOpen) {
			form.reset();
		}
}, [modalOpen, form]);

	function handleToggleAlbum(albumId: string) {
		const albumsIds = form.getValues("albumsIds")
		const albumsSet = new Set(albumsIds || []);

		if(albumsSet.has(albumId)) {
			albumsSet.delete(albumId);
		} else {
			albumsSet.add(albumId);
		}

		form.setValue("albumsIds", Array.from(albumsSet));
	}

	function handleSubmit(payload: PhotoNewFormSchema) {
		setIsCreatingPhoto(async () => {
			await createPhoto(payload);
			setModalOpen(false);
		});
	}
    return (
	<Dialog open={modalOpen} onOpenChange={setModalOpen}>
					<DialogTrigger asChild>{trigger}</DialogTrigger>
					<DialogContent>
						<form onSubmit={form.handleSubmit(handleSubmit)}>
						<DialogHeader>Adicionar Foto</DialogHeader>
						<DialogBody className="flex flex-col gap-5">
							<InputText error={form.formState.errors.title?.message} {...form.register("title")} placeholder="Adicione um título" maxLength={255}/>
							<Alert >
							Tamanho máximo: 50MB
							<br />
							Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP ou SVG
							</Alert>
							<InputSingleFile form={form} error={form.formState.errors.file?.message} {...form.register("file")}allowedExtesions={['png', 'jpg', 'jpeg', 'webp']} 
                            replaceBy={<ImageFilePreview src={fileSource} className="w-full h-56" />} maxFileSizeInMB={50} />
                            <div className="space-y-3">
                                <Text variant="label-small">Selecionar álbuns</Text>
								<div className="flex flex-wrap gap-3">
                                {!isLoadingAlbums && albums.length > 0 && albums.map(album =>
									<Button size="sm" className="truncate" variant={albumsIds?.includes(album.id) ? "primary" : "ghost"} key={album.id} onClick={() => handleToggleAlbum(album.id)}>{album.title}</Button>
								)
							}
							{isLoadingAlbums && Array.from({length: 5}).map((_, index) => 
								<Skeleton className="w-20 h-7" key={`albums-loading-dialog-${index}`} />
							)}
							</div>
                            </div>
						</DialogBody>
						<DialogFooter>
							<DialogClose asChild>
							<Button variant="secondary" disabled={isCreatingPhoto}>Cancelar</Button>
							</DialogClose>
							<Button disabled={isCreatingPhoto} handling={isCreatingPhoto} type="submit">{isCreatingPhoto ? "Adicionando..." : "Adicionar"}</Button>
						</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
	)
}