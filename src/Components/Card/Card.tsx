import styles from './Card.module.css';
import { IPictures } from 'Services/Utils/Interfaces';
import 'Assets/Styles/Global/Button.css';
import { useNavigate } from 'react-router-dom';

export default function Card({ photo, artist, year, category, id, authorID }: IPictures) {
  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const isCurrentUserCanEdit: boolean = authorID === localStorage.getItem('token');

  //   const handleEdit = () => {
  //     setEdit(false);

  //     axios.put(URL + 'pictures' + id, ['TODO']).then(() => {
  //       dispatch(editPicture(['FORM VALUES', 'ID PICTURE']));
  //     });
  //   };

  // const handleDelete = (id: string) => {
  //   try {
  //     axios.delete(URL + 'pictures/' + id);
  //     dispatch(deletePicture(id));
  //   } catch (error: AxiosError | any) {
  //     throw new error(error);
  //   }
  // };
  return (
    <div className={styles.card}>
      <img src={photo} className={styles.photo} alt={'photo of' + artist} />
      <div className={styles.cardInfos}>
        <div className={styles.description}>
          {artist} - {year} - {category}
        </div>
        {isCurrentUserCanEdit && (
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
