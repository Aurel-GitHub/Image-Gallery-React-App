import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from 'Services/Redux/Features/categorySlice';
import { CATEGORIES } from 'Services/Utils/Enums';
import { ICategoryState } from 'Services/Utils/Interfaces';
import styles from './FilterCategories.module.css';

export default function FilterCategories(): JSX.Element {
  const dispatch = useDispatch();

  const categorySelected = useSelector((state: ICategoryState) => state.category).category;

  function handleSelect(valueSelected: string): void {
    if (valueSelected === categorySelected) return;
    dispatch(setCategory(valueSelected));
  }

  return (
    <select
      id='categories-select'
      className={styles.selectOptionsFilter}
      onChange={(e) => handleSelect(e.target.value)}
      defaultValue={categorySelected}
    >
      <option value=''>Category</option>
      <option value={CATEGORIES.ARTWORK}>{CATEGORIES.ARTWORK}</option>
      <option value={CATEGORIES.UTILITIES}>{CATEGORIES.UTILITIES}</option>
      <option value={CATEGORIES.METAVERS}>{CATEGORIES.METAVERS}</option>
    </select>
  );
}
