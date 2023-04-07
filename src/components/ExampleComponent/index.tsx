import React from 'react';
import styled from 'styled-components';
import ExampleButton from './style';
import { useToggle } from './exampleComponentHooks';
import { useTranslation } from 'react-i18next';
import { useLanguageSwitcher } from './exampleComponentHooks';

function ExampleComponent() {
  const [isVisible, setIsVisible] = useToggle(false);
  const { currentLanguage, changeLanguage, t } = useLanguageSwitcher();

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>EN</button>
      <hr />
      <button onClick={() => changeLanguage('italian')}>IT</button>

      <ExampleButton primary onClick={setIsVisible}>
        {t('ExampleComponent.fieldOne')}
      </ExampleButton>

      <ExampleButton onClick={setIsVisible}>
        {t('ExampleComponent.fieldTwo')}
      </ExampleButton>

      {isVisible ? 'Hide' : 'Show'}
    </div>
  );
}

export default ExampleComponent;
