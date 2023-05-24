import React, { ChangeEvent, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { InputContainer, InputField, SendButton } from 'components/Chat/styles';
import { ReactComponent as SendIcon } from '@assets/send.svg';
import { Enter, MAX_CHARACTER_LIMIT, oneLine } from '@constants/other';

function MessageInput({
  send,
  typing,
}: {
  send: (value: string) => void;
  typing: (isTyping: boolean) => void;
}) {
  const { t } = useTranslation();

  const [value, setValue] = useState<string>('');

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value;
    setValue(message);
    typing(message !== '');
  };

  const handleSend = () => {
    if (value.trim() === '') {
      return;
    }
    send(value);
    setValue('');
    resetInputHeight();
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
      <InputField
        ref={inputRef}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        onInput={handleTextareaHeight}
        placeholder={t('Chat.typeMessage')}
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
