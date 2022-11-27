import styles from './Card.module.css';
import { IPictures } from 'Services/Utils/Interfaces';
import { useNavigate } from 'react-router-dom';
import 'Assets/Styles/Global/Button.css';

export default function Card({ photo, artist, year, category, id, authorID }: IPictures) {
  const navigate = useNavigate();

  const isUserCanUpdatePicture = (): boolean => {
    return localStorage.getItem('token') === authorID;
  };

  return (
    <div className={styles.card}>
      <img src={photo} className={styles.photo} alt={'photo of' + artist} />
      <div className={styles.cardInfos}>
        <div className={styles.description}>
          {artist} - {year} - {category}
        </div>
        {isUserCanUpdatePicture() && (
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
