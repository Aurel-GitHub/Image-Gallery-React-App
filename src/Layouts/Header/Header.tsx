import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import 'Assets/Styles/Global/Button.css';

export default function Header(): JSX.Element {
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header>
      <nav className={styles.navHeader}>
        <Link to='/' className={styles.decorationNone}>
          <h1 className={styles.logo}>NFT Gallery</h1>
        </Link>
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
