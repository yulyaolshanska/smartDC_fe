import React, { ChangeEvent, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import {
  InputContainer,
  InputField,
  SendButton,
  SelectFiles,
  SelectedFiles,
  Files,
} from 'components/Chat/styles';
import { ReactComponent as SendIcon } from '@assets/send.svg';
import { ReactComponent as Folder } from '@assets/folderPlus.svg';
import { Enter, MAX_CHARACTER_LIMIT, oneLine } from '@constants/other';
import { IAuth } from '@components/general/type';

export interface IMessageInput {
  text: string;
  user: IAuth;
  createdAt: Date;
  files: { fileName: string; file: string }[];
}

function MessageInput({
  sendMessage,
  typing,
  doctor,
}: {
  sendMessage: (message: IMessageInput) => void;
  typing: (isTyping: boolean) => void;
  doctor: IAuth;
}) {
  const { t } = useTranslation();
  const tWithDefault = (key: string) => {
    const translation = t(key);
    return translation !== key ? translation : '';
  };

  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const [value, setValue] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps } = useDropzone({ onDrop });

  const handleSend = () => {
    if (value.trim() === '' && !(files.length > 0)) {
      return;
    }

    if (files.length > 0) {
      const fileDataObjects: { fileName: string; file: string }[] = [];
      let filesRead = 0;

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = function () {
          if (typeof reader.result === 'string') {
            const base64String = reader.result
              .replace('data:', '')
              .replace(/^.+,/, '');

            const fileData = {
              fileName: file.name,
              file: base64String,
            };

            fileDataObjects.push(fileData);

            filesRead++;

            if (filesRead === files.length) {
              const message = {
                text: value.trim(),
                files: fileDataObjects,
                user: doctor,
                createdAt: new Date(),
              };
              sendMessage(message);
              setValue('');
              setFiles([]);
              resetInputHeight();
            }
          }
        };

        reader.readAsDataURL(file);
      });
    } else if (value.trim() !== '') {
      const message = {
        text: value.trim(),
        files: [],
        user: doctor,
        createdAt: new Date(),
      };
      sendMessage(message);
      setValue('');
      resetInputHeight();
    }
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value;
    setValue(message);
    typing(message !== '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === Enter && !(e.shiftKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;

      const numberOfLines = inputRef.current.value.split('\n').length;
      if (numberOfLines === oneLine) {
        inputRef.current.style.height = '';
      }
    }
  };

  const resetInputHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = '';
    }
  };

  return (
    <InputContainer>
      {files.length > 0 && (
        <SelectedFiles>
          {files.map((file) => (
            <Files key={file.name}>{file.name}</Files>
          ))}
        </SelectedFiles>
      )}
      <SelectFiles {...getRootProps()}>
        <Folder />
      </SelectFiles>
      <InputField
        ref={inputRef}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        onInput={handleTextareaHeight}
        placeholder={tWithDefault('Chat.typeMessage')}
        maxLength={MAX_CHARACTER_LIMIT}
        value={value}
      />
      <SendButton onClick={handleSend}>
        <SendIcon />
      </SendButton>
    </InputContainer>
  );
}

export default MessageInput;
