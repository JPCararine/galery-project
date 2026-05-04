import Container from "../components/container";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react"
import Button from "../components/button";
import { Link, useLocation } from "react-router";
import cx from "classnames";
import PhotosSearch from "./photos-search";
import Divider from "../components/divider";
import PhotoNewDialog from "../contexts/photos/components/photo-new-dialog";
import AlbumsNewDialog from "../contexts/albums/components/albums-new-dialog";

interface HeaderProps extends React.ComponentPropsWithoutRef<typeof Container> {

}

export default function Header({className, ...props}: HeaderProps) {
    const {pathname} = useLocation();
    return (
        <Container as="header" className={cx("flex justify-between items-center gap-10", className)} {...props}>
            <Link to="/">
            <Logo className="h-5" />
            </Link>
            {pathname === '/' && (
                <>
                <PhotosSearch />
                <Divider orientation="vertical" className="h-10" />
                </>
            )}
            <div className="flex items-center gap-3">
            <PhotoNewDialog trigger={<Button>Nova foto</Button>}/>
            <AlbumsNewDialog trigger={<Button variant="secondary">Criar álbum</Button>}/>
            </div>
        </Container>
    )
}