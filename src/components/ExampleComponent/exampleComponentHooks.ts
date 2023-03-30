import React from 'react';
import { useTranslation } from 'react-i18next';

export function useToggle(initialValue: boolean): [boolean, () => void] {
  const [value, setValue] = React.useState<boolean>(initialValue);
  const toggleValue = () => setValue(!value);
  return [value, toggleValue];
}

export function useLanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = React.useState<string>(
    i18n.language
  );

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
  };
}
