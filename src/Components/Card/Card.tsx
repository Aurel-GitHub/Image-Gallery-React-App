import styles from './Card.module.css';
import { IPictures } from 'Services/Utils/Interfaces';
import axios, { AxiosError } from 'axios';
import URL from 'Services/Utils/Constants/url';
import { useDispatch } from 'react-redux';
import { deletePicture } from 'Services/Redux/Features/picturesSlice';

export default function Card({ photo, artist, year, category, id }: IPictures) {
  const dispatch = useDispatch();

  //   const handleEdit = () => {
  //     setEdit(false);

  //     axios.put(URL + 'pictures' + id, ['TODO']).then(() => {
  //       dispatch(editPicture(['FORM VALUES', 'ID PICTURE']));
  //     });
  //   };

  const handleDelete = (id: string) => {
    try {
      axios.delete(URL + 'pictures/' + id);
      dispatch(deletePicture(id));
    } catch (error: AxiosError | any) {
      throw new error(error);
    }
  };
  return (
    <div className={styles.card}>
      <img src={photo} className={styles.photo} alt={'photo of' + artist} />
      <div className={styles.cardInfos}>
        <div className={styles.description}>
          {artist} - {year} - {category}
        </div>
        <div className={styles.btnDetails}>Edit</div>
        <div className={styles.btnDetails} onClick={() => handleDelete(id)}>
          Delete
        </div>
      </div>
    </div>
  );
}
