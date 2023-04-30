import styles from './layout/burgerMenu.module.scss';
import React from 'react';
import Layout from './layout';
import { useMount } from './hooksAvatarEditor';

export interface ChangerProps {
  opened: boolean;
  onClose: (value: boolean) => void;
  setAvatarUrl: (value: string) => void;
  avatar: () => string;
}

const AvatarChanger = ({
  opened,
  onClose,
  setAvatarUrl,
  avatar,
}: ChangerProps) => {
  const { mounted } = useMount({ opened });

  if (!mounted) {
    return null;
  }
  return (
    <Layout
      onClose={onClose}
      opened={opened}
      setAvatarUrl={setAvatarUrl}
      avatar={avatar}
    />
  );
};
export default AvatarChanger;
