import Container from "../components/container";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react"
import Button from "../components/button";
import { Link } from "react-router";
import cx from "classnames";
import PhotosSearch from "./photos-search";
import Divider from "../components/divider";

interface HeaderProps extends React.ComponentPropsWithoutRef<typeof Container> {

}

export default function Header({className, ...props}: HeaderProps) {
    return (
        <Container as="header" className={cx("flex justify-between items-center gap-10", className)} {...props}>
            <Link to="/">
            <Logo className="w-25 h-5" />
            </Link>
            <PhotosSearch />
            <Divider orientation="vertical" className="h-10" />
            <div className="flex items-center gap-3">
            <Button>Nova Foto</Button>
            <Button variant="secondary">Criar álbum</Button>
            </div>
        </Container>
    )
}