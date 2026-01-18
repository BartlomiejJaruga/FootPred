import styles from './LoadingIndicator.module.scss';

type LoadingIndicatorProps = {
  message: string;
  fontSize: string;
};

export function LoadingIndicator({ message, fontSize }: LoadingIndicatorProps) {
  return (
    <div className={styles.loading_container} style={{ fontSize: fontSize }}>
      <div className={styles.spinner} />
      <p>{message}</p>
    </div>
  );
}
