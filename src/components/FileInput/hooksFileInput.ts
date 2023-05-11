import React from 'react';

interface FileMap {
  [key: string]: File;
}

interface UseFileUploadOptions {
  maxFileSizeInBytes?: number;
}

interface UseFileUploadResult {
  fileInputField: React.RefObject<HTMLInputElement>;
  files: FileMap;
  handleUploadBtnClick: () => void;
  handleNewFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (fileName: string) => void;
  getFileData: (fileName: string) => { file: File; isImageFile: boolean };
}

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const useFileUpload = (
  updateFilesCb: (files: File[]) => void,
  options: UseFileUploadOptions = {},
): UseFileUploadResult => {
  const fileInputField = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<FileMap>({});

  const addNewFiles = (newFiles: File[]): FileMap => {
    const updatedFiles: FileMap = { ...files };
    for (const file of newFiles) {
      if (file.size < DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
        updatedFiles[file.name] = file;
      }
    }
    return updatedFiles;
  };

  const callUpdateFilesCb = (files: FileMap) => {
    const filesAsArray = Object.values(files);
    updateFilesCb(filesAsArray);
  };

  const handleUploadBtnClick = () => {
    if (fileInputField.current) {
      fileInputField.current.click();
    }
  };

  const handleNewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = e.target;
    if (newFiles && newFiles.length) {
      const updatedFiles = addNewFiles(Array.from(newFiles));
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName: string) => {
    const updatedFiles = { ...files };
    delete updatedFiles[fileName];
    setFiles(updatedFiles);
    callUpdateFilesCb(updatedFiles);
  };

  const getFileData = (fileName: string) => {
    const file = files[fileName];
    const isImageFile = file.type.split('/')[0] === 'image';
    return { file, isImageFile };
  };

  return {
    fileInputField,
    files,
    handleUploadBtnClick,
    handleNewFileUpload,
    removeFile,
    getFileData,
  };
};

export default useFileUpload;
