import { useState } from 'react';
import axios from 'axios';
import ButtonsCardDelete from 'Components/Buttons/Card/Delete/ButtonsCardDelete';
import { FiEdit } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { editPicture } from 'Services/Redux/Features/picturesSlice';
import { IPictures } from 'Services/Utils/Interfaces';
import URL from 'Services/Utils/Constants/url';

export default function Card({ artist, photo, id, year }: IPictures) {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEdit(false);

    axios.put(URL + 'pictures' + id, ['TODO']).then(() => {
      dispatch(editPicture(['FORM VALUES', 'ID PICTURE']));
    });
  };

  return (
    <div className='pic-card'>
      <img src={photo} alt={'photo of' + artist} />
      <div className='infos'>
        <div className='title'>
          {edit ? (
            <div>
              {/* <input defaultValue={pic.artist} ref={artistInput} autoFocus></input> */}
              <button onClick={() => handleEdit()}>Valider</button>
            </div>
          ) : (
            <h4>QQCH ICI</h4>
          )}
          <p>{year}</p>
        </div>
        <div className='btn-container'>
          <div className='edit-icon' onClick={() => setEdit(!edit)}>
            <FiEdit />
          </div>
          <ButtonsCardDelete id={id} />
        </div>
      </div>
    </div>
  );
}
