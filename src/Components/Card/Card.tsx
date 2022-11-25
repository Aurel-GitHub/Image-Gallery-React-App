import styles from './Card.module.css';
import { IPictures } from 'Services/Utils/Interfaces';

export default function Card({ photo, artist, year }: IPictures) {
  //   const dispatch = useDispatch();

  //   const handleEdit = () => {
  //     setEdit(false);

  //     axios.put(URL + 'pictures' + id, ['TODO']).then(() => {
  //       dispatch(editPicture(['FORM VALUES', 'ID PICTURE']));
  //     });
  //   };

  return (
    <div className={styles.card}>
      <img src={photo} className={styles.photo} alt={'photo of' + artist} />
      <div className={styles.cardInfos}>
        <div className={styles.title}>
          {artist} - {year}
        </div>
      </div>
    </div>
  );
}
