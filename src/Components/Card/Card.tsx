import styles from './Card.module.css';
import { IPictures } from 'Services/Utils/Interfaces';
import 'Assets/Styles/Global/Button.css';
import { useNavigate } from 'react-router-dom';

export default function Card({ photo, artist, year, category, id, authorID }: IPictures) {
  const navigate = useNavigate();

  // const handleDelete = (id: string) => {
  //   try {
  //     axios.delete(URL + 'pictures/' + id);
  //     dispatch(deletePicture(id));
  //   } catch (error: AxiosError | any) {
  //     throw new error(error);
  //   }
  // };

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
            {/* <div className='btnDetails' onClick={() => handleDelete(id)}>
              Delete
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
