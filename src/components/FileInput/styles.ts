import {
  BLACK,
  NOT_ACTIVE_BACKGROUND_HOVER,
  WHITE,
  BORDER,
  DARK_BLUE,
  ACTIVE,
} from '@constants/colors';

import FONT_ROBOTO from '@constants/fonts';
import styled from 'styled-components';

import {
  VERY_SMALL_FONT_SIZE,
  LARGE_FONT_SIZE,
  SMALL_FONT_SIZE,
  NORMAL_FONT_SIZE,
} from '@constants/fontSizes';

export const FileUploadContainer = styled.section`
  position: relative;
  margin: 15px 0 15px;
  border: 1px solid ${BORDER};
  padding: 35px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${WHITE};
  width: 100%;
`;

export const FormField = styled.input`
  font-size: ${NORMAL_FONT_SIZE};
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

export const InputLabel = styled.label`
  top: -21px;
  font-size: ${VERY_SMALL_FONT_SIZE};
  color: ${BLACK};
  left: 0;
  position: absolute;
`;

export const DragDropText = styled.p`
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: ${NORMAL_FONT_SIZE};
  color: ${DARK_BLUE};
  font-family: ${FONT_ROBOTO};
`;

export const UploadFileBtn = styled.button`
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border: 2px solid ${NOT_ACTIVE_BACKGROUND_HOVER};
  cursor: pointer;
  font-size: ${SMALL_FONT_SIZE};
  line-height: 1;
  padding: 15px 20px;
  text-align: center;
  font-weight: 700;
  border-radius: 6px;
  color: ${ACTIVE};
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  font-family: ${FONT_ROBOTO};
  width: 45%;
  display: flex;
  align-items: center;
  padding-right: 0;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: ${NOT_ACTIVE_BACKGROUND_HOVER};
    z-index: -1;
    transition: width 250ms ease-in-out;
  }

  i {
    font-size: ${LARGE_FONT_SIZE};
    margin-right: 5px;
    border-right: 2px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 500px) {
    width: 70%;
  }

  @media only screen and (max-width: 350px) {
    width: 100%;
  }

  &:hover {
    color: ${WHITE};
    outline: 0;
    background: transparent;

    &:after {
      width: 110%;
    }
  }

  &:focus {
    outline: 0;
    background: transparent;
  }

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const FilePreviewContainer = styled.article`
  margin-bottom: 35px;
  width: 100%;
  span {
    font-size: ${SMALL_FONT_SIZE};
  }
`;

export const PreviewList = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const FileMetaData = styled.div<{ isImageFile: boolean }>`
  display: ${(props) => (props.isImageFile ? 'none' : 'flex')};
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  border-radius: 6px;
  color: ${WHITE};
  font-weight: bold;
  background-color: rgba(5, 5, 5, 0.55);

  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`;

export const RemoveFileIcon = styled.i`
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
`;

export const PreviewContainer = styled.section`
  padding: 0.25rem;
  width: 20%;
  height: 120px;
  border-radius: 6px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.55;

    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }
`;

export const ImagePreview = styled.img`
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;
