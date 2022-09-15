import { FC, ReactNode } from 'react';
import styles from './form-control.module.css';

interface Props {
  children?: ReactNode;
}

const FormControl: FC<Props> = ({ children }) => {
  return <div className={styles.formControl}>{children}</div>;
};

export default FormControl;
