import { type VariantProps ,tv} from "tailwind-variants";
import Icon from "./icon";
import Text, { textVariants } from "./text";
import UploadFileIcon from "../assets/icons/upload-file.svg?react";
import FileImageIcon from "../assets/icons/image.svg?react";
import React from "react";
import { useWatch } from "react-hook-form";

export const inputSingleFileVariants = tv({
    base: "flex flex-col items-center justify-center transition w-full group-hover:border-border-active border border-solid border-border-primary rounded-lg gap-1",
    variants: {
        size: {
            md: "px-5 py-6"
        }
    },
    defaultVariants: {
        size: "md"
    }
}); 

export const inputSingleFileIconVariants = tv({
    base: "fill-placeholder",
    variants: {
        size: {
            md: "w-8 h-8"
        }
    },
    defaultVariants: {
            size: "md"
        }
});

interface InputSingleFileProps extends VariantProps<typeof inputSingleFileVariants>,
          Omit<React.ComponentProps<"input">, "size"> {
            error?: React.ReactNode;
            allowedExtesions: string[];
            maxFileSizeInMB: number;
            form: any;
            replaceBy?: React.ReactNode;
          }




export default function InputSingleFile({ replaceBy , form , size, error, allowedExtesions, maxFileSizeInMB, ...props}: InputSingleFileProps) {
    const formValues = useWatch({control: form.control});
    const name = props.name || "";
    const formFile: File = React.useMemo(() => 
        formValues[name]?.[0],
        [formValues, name]
    );
    const { fileExtension, fileSize } = React.useMemo(() => ({
        fileExtension: formFile?.name.split(".").pop()?.toLowerCase() || "",
        fileSize: formFile?.size || 0
    }), [formFile]);
    const errorMessage = React.useMemo(() => {
    if (!formFile) return error || null;

    if (!isValidExtension()) {
        return "Extensão de arquivo não permitida.";
    }

    if (!isValidSize()) {
        return "Tamanho do arquivo excede o limite máximo.";
    }

    return null;
}, [formFile, fileExtension, fileSize, error]);

    function isValidExtension() {
        return allowedExtesions.includes(fileExtension);
    }

    function isValidSize() {
        return fileSize <= maxFileSizeInMB * 1024 * 1024;
    }
    
    function isValidFile() {
        return isValidExtension() && isValidSize();
    }


    
    return (
        <div>
            {!formFile || !isValidFile() ? (
                <>
            <div className="w-full relative group cursor-pointer">
                <input type="file" className={"absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"} {...props} />
                <div className={inputSingleFileVariants({size})}>
                    <Icon svg={UploadFileIcon} className={inputSingleFileIconVariants({size})}/>
            
                    <Text variant="label-medium" className="text-placeholder text-center">
                        Arraste o arquivo aqui
                        <br />
                        Ou clique para selecionar
                    </Text>
                </div>
            </div>
            <div className="flex flex-col gap-1 mt-1">
                {errorMessage && (
                    <Text variant="label-small" className="text-accent-red">
                        {errorMessage}
                    </Text>
                )}
            </div>
            </>
        ) : (
            <>
            {replaceBy}
              <div className="flex gap-3 items-center border border-solid border-border-primary rounded p-3 mt-4">
                <Icon svg={FileImageIcon} className="fill-white w-6 h-6 ml-2" />
                <div className="flex flex-col">
                    <div className="truncate max-w-80">
                        <Text variant="label-medium" className="text-placeholder">
                            {formFile.name}
                        </Text>
                        <div className="flex">
                            <button type="button" onClick={() => form.setValue(name, undefined)}
                            className={textVariants({variant: "label-small", className: "text-accent-red cursor-pointer hover:underline"})}>
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </>
            )}
            
        </div>

    );
}
            