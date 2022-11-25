import FormAuthentication from 'Components/Forms/Authentication/FormAuthentication';
import styles from './Login.module.css';

export default function Login(): JSX.Element {
  return (
    <div className={styles.authSection}>
      <FormAuthentication />
    </div>
  );
}
