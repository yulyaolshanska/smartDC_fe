import styled from 'styled-components';
import {
  BLACK,
  BORDER,
  DRAWER_CONT,
  HINT,
  NAVY_BLUE,
  VERY_LIGHT_GREY,
  WHITE,
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
  background-color: ${NAVY_BLUE};
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
  padding: 10px 70px 5px 20px;
  width: 100%;
  line-height: 22px;
  height: 40px;
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
  bottom: 0;
  right: 20px;
`;
