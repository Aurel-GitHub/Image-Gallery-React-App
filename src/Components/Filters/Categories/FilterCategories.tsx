import { CATEGORIES } from 'Services/Utils/Enums';
import styles from './FilterCategories.module.css';

export default function FilterCategories(): JSX.Element {
  return (
    <select id='categories-select' className={styles.selectOptionsFilter}>
      <option value={CATEGORIES.ARTWORK}>{CATEGORIES.ARTWORK}</option>
      <option value={CATEGORIES.UTILITIES}>{CATEGORIES.UTILITIES}</option>
      <option value={CATEGORIES.METAVERS}>{CATEGORIES.METAVERS}</option>
    </select>
  );
}
