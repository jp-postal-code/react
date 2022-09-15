import { ComponentPropsWithoutRef, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './input.module.css';

type Props = ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input ref={ref} {...props} className={clsx(className, styles.input)} />
  );
});

export default Input;
