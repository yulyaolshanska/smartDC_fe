import styles from './layout/burgerMenu.module.scss';
import React from 'react';
import Layout from './layout';
import { useMount } from './hooksAvatarEditor';

export type ChangerProps = {
  opened: boolean;
  onClose: (value: boolean) => void;
};

const AvatarChanger: React.FC<ChangerProps> = ({ opened, onClose }) => {
  const { mounted } = useMount({ opened });

  if (!mounted) {
    return null;
  }
  return <Layout onClose={onClose} opened={opened} />;
};
export default AvatarChanger;
