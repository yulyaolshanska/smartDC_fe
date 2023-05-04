import React, { useRef, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel,
} from './styles';
import { useTranslation } from 'react-i18next';

interface FileUploadProps {
  label: string;
  updateFilesCb: (files: File[]) => void;
  maxFileSizeInBytes?: number;
  multiple?: boolean;
}

interface FileMap {
  [key: string]: File;
}

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj: FileMap) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes: number) =>
  Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}: FileUploadProps) => {
  const fileInputField = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<{}>({});

  const { t } = useTranslation();

  const handleUploadBtnClick = () => {
    fileInputField.current && fileInputField.current.click();
  };

  const addNewFiles = (newFiles: File[]): FileMap => {
    const updatedFiles: FileMap = { ...files };
    for (let file of newFiles) {
      if (file.size < maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { [file.name]: file } as FileMap;
        }
        updatedFiles[file.name] = file;
      }
    }
    return updatedFiles;
  };

  const callUpdateFilesCb = (files: FileMap) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = e.target;
    if (newFiles && newFiles.length) {
      let updatedFiles = addNewFiles(Array.from(newFiles));
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName: string) => {
    const toRemoveFiles: { [key: string]: any } = { ...files };
    delete toRemoveFiles[fileName];
    setFiles(toRemoveFiles);
    callUpdateFilesCb(toRemoveFiles);
  };

  const getFileData = (files: { [key: string]: any }, fileName: string) => {
    let previewFiles: { [key: string]: any } = { ...files };
    let file = previewFiles[fileName];
    let isImageFile = file.type.split('/')[0] === 'image';
    return { file, isImageFile };
  };

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>{t('Notes.Draganddropyourfilesanywhereor')}</DragDropText>
        <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
          <span>
            {t('Notes.Upload')} {otherProps.multiple ? 'files' : 'a file'}
          </span>
        </UploadFileBtn>
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </FileUploadContainer>
      <FilePreviewContainer>
        <span> {t('Notes.ToUpload')}</span>
        <PreviewList>
          {Object.keys(files).map((fileName, index) => {
            const { file, isImageFile } = getFileData(files, fileName);
            return (
              <PreviewContainer key={fileName}>
                <div>
                  {isImageFile && (
                    <ImagePreview
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  )}
                  <FileMetaData isImageFile={isImageFile}>
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <RemoveFileIcon onClick={() => removeFile(fileName)}>
                        <ClearIcon />
                      </RemoveFileIcon>
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  );
};

export default FileUpload;
