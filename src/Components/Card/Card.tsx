import styles from './Card.module.css';
import { IPictures } from 'Services/Utils/Interfaces';
import 'Assets/Styles/Global/Button.css';
import { useNavigate } from 'react-router-dom';

export default function Card({ photo, artist, year, category, id, authorID }: IPictures) {
  const navigate = useNavigate();

  const isUserCanUpdateCard = (): boolean => {
    return localStorage.getItem('token') === authorID;
  };

  return (
    <div className={styles.card}>
      <img src={photo} className={styles.photo} alt={'photo of' + artist} />
      <div className={styles.cardInfos}>
        <div className={styles.description}>
          {artist} - {year} - {category}
        </div>
        {isUserCanUpdateCard() && (
          <>
            <div className='btnDetails' onClick={() => navigate('/picture-detail/' + id)}>
              Edit
            </div>
          </>
        )}
      </div>
    </div>
  );
}
