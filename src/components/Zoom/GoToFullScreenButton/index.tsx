import { GoToFullScreenButtonStyle } from './styles';
import { ReactComponent as FullScreenIcon } from '@assets/fullScreenCall.svg';

interface GoToFullScreenButtonProps {
  isSelfFullScreen?: boolean;
  isParticipantFullScreen?: boolean;
  changeShape?: () => void;
}

const GoToFullScreenButton = ({
  isSelfFullScreen,
  isParticipantFullScreen,
  changeShape,
}: GoToFullScreenButtonProps) => {
  return (
    <GoToFullScreenButtonStyle
      onClick={changeShape}
      isSelfFullScreen={isSelfFullScreen}
      isParticipantFullScreen={isParticipantFullScreen}
    >
      <FullScreenIcon />
    </GoToFullScreenButtonStyle>
  );
};

export default GoToFullScreenButton;
