import styles from './Button.module.scss';

export interface ButtonProps {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};

export default function Button({
  disabled = false,
  onClick,
  children
} : ButtonProps
){
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
