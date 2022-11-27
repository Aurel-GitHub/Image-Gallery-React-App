import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import 'Assets/Styles/Global/Button.css';
import FilterCategories from 'Components/Filters/Categories/FilterCategories';
import { useDispatch } from 'react-redux';
import { setCategory } from 'Services/Redux/Features/categorySlice';

export default function Header(): JSX.Element {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logout = async () => {
    localStorage.clear();
    dispatch(setCategory(''));
    navigate('/login');
  };

  return (
    <header>
      <nav className={styles.navHeader}>
        <Link to='/' className={styles.decorationNone}>
          <h1 className={styles.logo}>NFT Gallery</h1>
        </Link>
        <FilterCategories />
        <div className={styles.btnSection}>
          <button className='btnPrimary' onClick={() => navigate('/add-picture')}>
            Add images
          </button>
          <button className='btnPrimary' onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
