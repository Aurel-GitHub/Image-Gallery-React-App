import { Error } from 'Services/Utils/Types/Error';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message }: Error) {
  return <>{message && <small className={styles.textDanger}>{message}</small>}</>;
}
