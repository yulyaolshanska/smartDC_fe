import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { Message } from '@components/Chat';
import { timeFormat } from '@constants/format';
import {
  AnotherUserContainer,
  AnotherUserMessageContainer,
  MessageInfo,
  MessageText,
  UserContainer,
  UserMessageContainer,
  DownloadButton,
  FileContainer,
  FileName,
} from 'components/Chat/styles';
import { AiOutlineDownload } from 'react-icons/ai';
import { download } from '@constants/socket';

function Messages({
  messages,
  currentUser,
}: {
  messages: Message[];
  currentUser: number;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL_SERVER;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileDownload = async (fileUrl: string) => {
    const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL_SERVER;
    const modifiedFileUrl = baseUrl + fileUrl;

    const response = await fetch(modifiedFileUrl);
    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    link.setAttribute(download, fileName);

    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      {messages.map((message, index) => {
        const isCurrentUser = message.user.id === currentUser;

        const Container = isCurrentUser ? UserContainer : AnotherUserContainer;

        const MessageContainerComponent = isCurrentUser
          ? UserMessageContainer
          : AnotherUserMessageContainer;

        return (
          <Container key={index}>
            <MessageContainerComponent>
              <MessageText>
                {message.text}
                {message.fileName &&
                  message?.fileName.map((name, fileIndex) => (
                    <FileContainer key={fileIndex}>
                      <DownloadButton
                        onClick={() =>
                          handleFileDownload(message.file[fileIndex])
                        }
                      >
                        <AiOutlineDownload />
                      </DownloadButton>
                      <FileName
                        href={baseUrl + message.file[fileIndex]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {name}
                      </FileName>
                    </FileContainer>
                  ))}
              </MessageText>
              <MessageInfo>
                {`${moment(message.createdAt).format(timeFormat)} ${
                  message.user.lastName
                }`}
              </MessageInfo>
            </MessageContainerComponent>
          </Container>
        );
      })}
      <div ref={messagesEndRef} />
    </>
  );
}

export default Messages;
