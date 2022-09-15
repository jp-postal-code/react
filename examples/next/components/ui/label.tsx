import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './label.module.css';

type Props = ComponentPropsWithoutRef<'label'>;

const Label = forwardRef<HTMLLabelElement, Props>(function Label(
  { children, className, ...props },
  ref
) {
  return (
    <label ref={ref} {...props} className={clsx(className, styles.label)}>
      {children}
    </label>
  );
});

export default Label;
