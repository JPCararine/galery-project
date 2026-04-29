import Button from "../components/button";
import ButtonIcon from "../components/button-icon";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "../assets/icons/chevron-right.svg?react";
import Badge from "../components/badge";
import Alert from "../components/alert";
import Divider from "../components/divider";
import InputText from "../components/input-text";
import Search from "../assets/icons/search.svg?react";
import { InputCheckbox } from "../components/input-checkbox";
import InputSingleFile from "../components/input-single-file";
import { useForm } from "react-hook-form";
import ImageFilePreview from "../components/image-file-preview";
import { Dialog } from "@radix-ui/react-dialog";
import {DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger} from "../components/dialog";
import { Album } from "../components/album";

export default function PageComponents() {
	const form = useForm();
	const file = form.watch("file");
	const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;
	return (
		<div className="grid gap-7 p-6">
			<div className="flex gap-3">
				<Button>Button</Button>
				<Button variant="secondary">Button</Button>
				<Button disabled>Button</Button>
				<Button handling>Loading</Button>
				<Button icon={ChevronRightIcon}>Próxima Imagem</Button>
				<Button variant="ghost" size="sm">
					Button
				</Button>
				<Button variant="primary" size="sm">
					Button
				</Button>
			</div>

			<div className="flex gap-3">
				<ButtonIcon icon={ChevronLeftIcon} />
				<ButtonIcon icon={ChevronRightIcon} variant="secondary" />
			</div>

			<div className="flex gap-3">
				<Badge>Todos</Badge>
				<Badge>Natureza</Badge>
				<Badge>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
			</div>

			<div>
				<Alert>
					Tamanho máximo: 50MB
					<br />
					Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP
				</Alert>
			</div>

			<div>
				<Divider />
			</div>
			<div>
				<InputText icon={Search} placeholder="Pesquisar..."  />
			</div>
			<div>
				<InputCheckbox />
			</div>
			<div>
				<InputSingleFile form={form} allowedExtesions={['png', 'jpg', 'jpeg', 'webp']} replaceBy={<ImageFilePreview src={fileSource} alt="Imagem" />} maxFileSizeInMB={50} {...form.register("file")} />
			</div>
			<div>

				<Dialog>
					<DialogTrigger asChild>
						<Button>Abrir Modal</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>Adicionar Foto</DialogHeader>
						<DialogBody className="flex flex-col gap-7">
							<InputText placeholder="Adicione um título"/>
							<Alert >
							Tamanho máximo: 50MB
							<br />
							Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP ou SVG
							</Alert>
							<InputSingleFile form={form} allowedExtesions={['png', 'jpg', 'jpeg', 'webp']} replaceBy={<ImageFilePreview src={fileSource} alt="Imagem" />} maxFileSizeInMB={50} {...form.register("file")} />
							<Album />
						</DialogBody>
						<DialogFooter>
							<DialogClose asChild>
							<Button variant="secondary">Cancelar</Button>
							</DialogClose>
							<Button disabled={!file}>Adicionar</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
