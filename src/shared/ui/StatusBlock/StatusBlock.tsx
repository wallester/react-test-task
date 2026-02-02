import React from 'react';
import styles from './StatusBlock.module.scss';
import clsx from 'clsx';

type Props = {
  variant: 'loading' | 'error' | 'empty';
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function StatusBlock({ variant, title, description, action }: Props) {
  return (
    <div className={clsx(styles.root, styles[variant])}>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.desc}>{description}</div>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
