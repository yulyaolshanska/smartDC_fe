import Accordion from '@components/Accordion';
import HelpContainer from './styles';

const Help = () => {
  return (
    <HelpContainer>
      {Array(5)
        .fill(0)
        .map((obj) => (
          <Accordion />
        ))}
    </HelpContainer>
  );
};

export default Help;
