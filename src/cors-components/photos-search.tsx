import InputText from "../components/input-text";
import Search from "../assets/icons/search.svg?react";
import { debounce } from "../helpers/utils";
import React from "react";

export default function PhotosSearch({}) {
    const [inputValue, setInputValue] = React.useState("");
    const deboncedSetValue = React.useCallback(
        debounce((value: string) => {
            console.log("Search for", value);
        }, 500),
        []
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