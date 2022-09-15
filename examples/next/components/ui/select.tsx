import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './select.module.css';

type Props = ComponentPropsWithoutRef<'select'>;

const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { children, className, ...props },
  ref
) {
  return (
    <select {...props} ref={ref} className={clsx(className, styles.select)}>
      {children}
    </select>
  );
});

export default Select;
