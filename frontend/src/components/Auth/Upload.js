import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const Upload = ({ setFormData }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFile) => [
        ...previousFile,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
    console.log(files);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  });

  const removeImg = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  useEffect(() => {
    const photoId = files.map((file) => file.preview);
    setFormData((prev) => ({
      ...prev,
      photo: photoId[0],
    }));
  }, [files]);

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        {files.length === 0 ? (
          <p className="opacity-50">
            Drag 'n' drop some files here, or click to select files
          </p>
        ) : (
          ""
        )}
      </div>

      {/* preview section */}
      <div className="text-white">
        <ul>
          {files.map((file) => (
            <li key={file.name}>
              <img
                className="rounded-lg md:w-1/2 w-full mx-auto"
                src={file.preview}
              />
              <p className="opacity-50 text-center">{file.name}</p>
              <div
                className=" text-center"
                onClick={() => removeImg(file.name)}
              >
                cancel
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Upload;
