import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloseIcon, FileIcon } from "../../../icons";

export default function FileUploader({
  setValue,
  name,
  field,
}: {
  setValue: Function;
  name: string;
  field: any;
}) {
  const [file, setFile] = useState<File | null>(field.value); // Explicit type annotation

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      "image/svg+xml": [".svg"],
      "image/png": [".png"],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);

        try {
          const base64 = await convertToBase64(selectedFile);
          setValue(name, base64);
        } catch (error) {
          console.error("Error converting file to base64", error);
        }
      }
    },
  });

  return (
    <div className="max-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-[4px] p-6 text-center cursor-pointer transition-all ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-100"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-placeholderText flex flex-col gap-2 items-center">
          <FileIcon fontSize={30} />
          {isDragActive ? (
            "Drop the files here..."
          ) : (
            <p>
              Drag and drop or{" "}
              <span className="font-bold text-secondary">upload</span>{" "}
              <span className="text-primary">[SVG or PNG]</span>
            </p>
          )}
        </div>
        {file && (
          <div className="mt-4 flex justify-center gap-2">
            <h2>{file.name}</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setValue(name, null);
              }}
              className="transition duration-300 hover:text-gray-500"
            >
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
