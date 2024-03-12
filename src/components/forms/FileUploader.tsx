import { useDropzone, FileWithPath } from 'react-dropzone';
import { useCallback, useState } from 'react';
import { Button } from '../ui/button';

const FileUploader = ({ change, mediaUrl }: any) => {
  const [fileUrl, setFileUrl] = useState('');
  const [file, setFile] = useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      change(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.svg', 'jpeg', 'JPG'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="w-full bg-dark-3 rounded-md border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 h-30 flex justify-center items-center relative h-64 py-4"
    >
      <input {...getInputProps()} className="cursor-pointer absolute inset-0" />
      {mediaUrl ? (
        <div className="h-64 max-w-[80%] w-full mx-auto py-2 overflow-hidden">
          <img src={mediaUrl} className="object-cover" />
        </div>
      ) : !fileUrl ? (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={70}
            alt="file-upload"
          />
          <h3 className="text-light-2 font-semibold text-lg">
            Drag photo here
          </h3>
          <Button className="shad-button_dark-4">Upload</Button>
        </div>
      ) : (
        <div className="h-[90] max-w-[80%] w-full mx-auto">
          <img src={fileUrl} className="object-cover" />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
