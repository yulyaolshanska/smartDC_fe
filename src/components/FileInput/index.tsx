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
import useFileUpload from './hooksFileInput';

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

const convertBytesToKB = (bytes: number) =>
  Math.round(bytes / KILO_BYTES_PER_BYTE);

interface FileUploadProps {
  label: string;
  updateFilesCb: (files: File[]) => void;
  maxFileSizeInBytes?: number;
  multiple?: boolean;
}

const FileUpload = ({
  label,
  updateFilesCb,

  multiple,
}: FileUploadProps) => {
  const {
    fileInputField,
    files,
    handleUploadBtnClick,
    handleNewFileUpload,
    removeFile,
    getFileData,
  } = useFileUpload(updateFilesCb);

  const { t } = useTranslation();

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>{t('Notes.Draganddropyourfilesanywhereor')}</DragDropText>
        <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
          <span>
            {t('Notes.Upload')} {multiple ? 'files' : 'a file'}
          </span>
        </UploadFileBtn>
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          multiple={multiple}
        />
      </FileUploadContainer>
      <FilePreviewContainer>
        <span> {t('Notes.ToUpload')}</span>
        <PreviewList>
          {Object.keys(files).map((fileName, index) => {
            const { file, isImageFile } = getFileData(fileName);
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
