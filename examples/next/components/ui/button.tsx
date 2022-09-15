import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './button.module.css';

type Props = ComponentPropsWithoutRef<'button'>;

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { children, className, ...props },
  ref
) {
  return (
    <button {...props} ref={ref} className={clsx(className, styles.button)}>
      {children}
    </button>
  );
});

export default Button;
