import Skeleton from "../../../components/skeleton";
import LeftIcon from "../../../assets/icons/chevron-left.svg?react"
import RightIcon from "../../../assets/icons/chevron-right.svg?react"
import ButtonIcon from "../../../components/button-icon";
import Button from "../../../components/button";
import { useNavigate } from "react-router";
import cx from "classnames";

interface PhotosNavigatorProps extends React.ComponentProps<"div"> {
    previousPhotosId?: string;
    nextPhotoId?: string;
    loading?: boolean;
}


export default function PhotosNavigator({previousPhotosId, nextPhotoId, loading, className, ...props}: PhotosNavigatorProps) {
    const navigate = useNavigate();
    return (
        <div className={cx("flex gap-2")} {...props}>
            {!loading ? ( 
                <>
                <ButtonIcon icon={LeftIcon} variant="secondary" disabled={!previousPhotosId} onClick={() => {navigate('/fotos/${previousPhotoId}')}}/>
                <Button icon={RightIcon} variant="secondary" disabled={!nextPhotoId} onClick={() => {navigate('/fotos/${nextPhotoId}')}}>Próxima Imagem</Button>
                </>
            
            
            ) : (
                <>
                    <Skeleton className="w-10 h-10" />
                    <Skeleton className="w-20 h-10" />
                </>
            )}
        </div>
    )
}