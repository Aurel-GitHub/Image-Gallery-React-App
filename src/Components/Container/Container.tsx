import { ChildrenProps } from 'Services/Utils/Interfaces/i-children-props';
import styles from './Container.module.css';

export default function Container({ children }: ChildrenProps): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}
