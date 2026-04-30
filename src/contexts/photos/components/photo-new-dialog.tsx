import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Alert from "../../../components/alert";
import Button from "../../../components/button";
import ImageFilePreview from "../../../components/image-file-preview";
import InputSingleFile from "../../../components/input-single-file";
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import {albums} from "../../../mocks/gallery-data";
import Skeleton from "../../../components/skeleton";
import { useForm } from "react-hook-form";
import { DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader } from "../../../components/dialog";
interface PhotoNewDialogProps {
    trigger: React.ReactNode;
    loading?: boolean;
}

export default function PhotoNewDialog({trigger, loading}: PhotoNewDialogProps) {
	const form = useForm();
    return (
	<Dialog>
					<DialogTrigger asChild>{trigger}</DialogTrigger>
					<DialogContent>
						<DialogHeader>Adicionar Foto</DialogHeader>
						<DialogBody className="flex flex-col gap-5">
							<InputText placeholder="Adicione um título" maxLength={255}/>
							<Alert >
							Tamanho máximo: 50MB
							<br />
							Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP ou SVG
							</Alert>
							<InputSingleFile form={form} allowedExtesions={['png', 'jpg', 'jpeg', 'webp']} 
                            replaceBy={<ImageFilePreview className="w-full h-56" />} maxFileSizeInMB={50} />
                            <div className="space-y-3">
                                <Text variant="label-small">Selecionar álbuns</Text>
								<div className="flex flex-wrap gap-3">
                                {!loading && albums.length > 0 && albums.map(album =>
									<Button size="sm" className="truncate" variant="ghost" key={album.id}>{album.title}</Button>
								)
							}
							{loading && Array.from({length: 5}).map((_, index) => 
								<Skeleton className="w-20 h-7" key={`albums-loading-dialog-${index}`} />
							)}
							</div>
                            </div>
						</DialogBody>
						<DialogFooter>
							<DialogClose asChild>
							<Button variant="secondary">Cancelar</Button>
							</DialogClose>
							<Button>Adicionar</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
	)
}