import InputText from "../components/input-text";
import Search from "../assets/icons/search.svg?react";
import { debounce } from "../helpers/utils";
import React from "react";
import usePhotos from "../contexts/photos/hooks/use-photos";

export default function PhotosSearch({}) {
    const [inputValue, setInputValue] = React.useState("");
    const {filters} = usePhotos();
    const deboncedSetValue = React.useCallback(
        debounce((value: string) => {
            filters.setQ(value);
        }, 500),
        [filters.setQ]
    );

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInputValue(value);
        deboncedSetValue(value);
    }
    
    return (
        <InputText icon={Search} placeholder="Buscar fotos" className="flex-1" value={inputValue} onChange={handleInputChange} />
    )
}