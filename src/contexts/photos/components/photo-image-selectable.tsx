import ImageFilePreview from "../../../components/image-file-preview";
import {tv} from "tailwind-variants";
import React from "react";
import { InputCheckbox } from "../../../components/input-checkbox";

export const photoImageSelectableVariants = tv({
    base: "cursor-pointer relative rounded-lg overflow-hidden",
    variants: {
        selected: {
            true: "outline-2 outline-accent-brand"
        }
    }
})

interface PhotoImageSelectableProps extends React.ComponentProps<typeof ImageFilePreview> {
    selected?: boolean;
    onSelectImage?: (selected: boolean) => void;
}

export default function PhotoImageSelectable({className, selected, onSelectImage, ...props}: PhotoImageSelectableProps) {
    const [isSelected, setIsSelected] = React.useState(selected);
    
    function handleSelect() {
        const newValue = !isSelected;

        setIsSelected(newValue);
        onSelectImage?.(newValue);
    }
    return (
        <label className={photoImageSelectableVariants({className, selected: isSelected})}>
            <InputCheckbox size="sm" checked={isSelected} onChange={handleSelect} className="absolute top-2 left-2 z-10" />
            <ImageFilePreview {...props} />
        </label>
    )
}