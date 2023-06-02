import styled from 'styled-components';
import {
  BLACK,
  BLUE,
  BORDER,
  DRAWER_CONT,
  HINT,
  NAVY_BLUE,
  VERY_LIGHT_GREY,
  WHITE,
  ZAMBEZI,
} from '@constants/colors';
import FONT_ROBOTO from '@constants/fonts';
import { SMALL_FONT_SIZE, VERY_SMALL_FONT_SIZE } from '@constants/fontSizes';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${BORDER};
  height: 90vh;
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
  background-color: ${DRAWER_CONT};
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${SMALL_FONT_SIZE};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  width: fit-content;
  max-width: 70%;
  align-items: flex-start;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const UserMessageContainer = styled(MessageContainer)`
  background-color: ${BLUE};
  color: ${WHITE};
  align-items: flex-end;
`;

export const AnotherUserContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const AnotherUserMessageContainer = styled(MessageContainer)`
  background-color: ${HINT};
  color: ${WHITE};
  align-items: flex-start;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  border-bottom: none;
  padding: 10px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${VERY_LIGHT_GREY};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${NAVY_BLUE};
  }
`;

export const Typing = styled.div`
  color: ${HINT};
  padding-left: 20px;
`;

export const MessageInfo = styled.div`
  color: ${BLACK};
  margin-top: 5px;
  font-size: ${VERY_SMALL_FONT_SIZE};
  align-self: flex-end;
`;

export const MessageText = styled.div`
  word-break: break-word;
  white-space: pre-wrap;
`;

export const InputContainer = styled.div`
  position: relative;
  border-top: 1px solid ${BORDER};
  background-color: ${WHITE};
  align-items: center;
`;

export const InputField = styled.textarea`
  flex: 1;
  align-items: center;
  padding: 10px 70px 5px 70px;
  width: 100%;
  line-height: 27px;
  height: 44px;
  max-height: 100px;
  overflow-y: auto;
  resize: none;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${VERY_LIGHT_GREY};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${NAVY_BLUE};
  }
`;

export const SendButton = styled.button`
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 3px;
  right: 20px;
`;

export const SelectFiles = styled.div`
  left: 20px;
  bottom: 11px;
  cursor: pointer;
  position: absolute;
`;

export const SelectedFiles = styled.div`
  padding: 10px 0px 10px 0px;
  margin-left: 20px;
  margin-right: 20px;
  border-bottom: 1px solid ${BORDER};
`;

export const Files = styled.div`
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
`;

export const DownloadButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: ${ZAMBEZI};
  margin-right: 10px;
  :hover {
    background-color: ${BLUE};
  }
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  color: ${WHITE};
  padding: 5px 12px 5px 5px;
  background-color: ${DRAWER_CONT};
  border-radius: 50px;
  height: 40px;
  width: fit-content;
  margin-top: 10px;
`;

export const FileName = styled.a`
  color: ${BLACK};
  :hover {
    color: ${NAVY_BLUE};
  }
`;
