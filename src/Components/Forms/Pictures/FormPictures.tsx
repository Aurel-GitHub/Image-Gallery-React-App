import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import URL from 'Services/Utils/Constants/url';
import { IFormPictures, IPictures } from 'Services/Utils/Interfaces';
import { pictureValidator } from 'Services/Utils/Validators/picturesValidator';
import styles from './FormPictures.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addPicture, deletePicture, editPicture } from 'Services/Redux/Features/picturesSlice';
import ErrorMessage from 'Components/ErrorMessage/ErrorMessage';
import 'Assets/Styles/Global/Inputs.css';

export default function FormPictures({ isEdit, picture }: IFormPictures): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formLabels: { title: string; label: string } = {
    title: !isEdit ? 'Create a new Picture' : 'Edit the picture details of ' + picture?.artist,
    label: !isEdit ? 'Create' : 'Edit',
  };

  const dispatch = useDispatch();

  const naviguate = useNavigate();

  const getRandomPictures: string = Math.floor(Math.random() * 300).toString();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPictures>({
    resolver: yupResolver(pictureValidator),
  });
  const onSubmit: SubmitHandler<IPictures> = async (formValues: IPictures): Promise<void> => {
    try {
      let response: AxiosResponse;
      const currentUserID: string = localStorage.getItem('token')!;
      if (!isEdit && currentUserID) {
        formValues.authorID = currentUserID;
        formValues.id = uuidv4();
        response = await axios.post(URL + 'pictures', formValues);
        dispatch(addPicture(response.data));
      } else {
        const id: string = location.pathname.slice(16);
        response = await axios.put(URL + 'pictures/' + id, formValues);
        dispatch(editPicture(response.data));
      }
      naviguate('/');
    } catch (error: AxiosError | any) {
      setErrorMessage('Try again later please');
      throw new Error(error);
    } finally {
      reset();
    }
  };

  const handleDelete = async (pictureID: string): Promise<void> => {
    try {
      axios.delete(URL + 'pictures/' + pictureID);
      dispatch(deletePicture(pictureID));
      naviguate('/');
    } catch (error: AxiosError | any) {
      throw new error(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      reset(picture);
    } else {
      setValue('photo', 'https://picsum.photos/400/' + getRandomPictures);
    }
  }, [picture]);

  return (
    <>
      <form className={styles.formPicture} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputSection}>
          <h1>{formLabels.title}</h1>
          <label>Artist</label>
          <input placeholder='Artist' type='text' className='inputForm' {...register('artist')} />
          <ErrorMessage message={errors.artist?.message} />

          <label>Year</label>
          <input placeholder='Year' type='number' className='inputForm' {...register('year')} />
          <ErrorMessage message={errors.year?.message} />

          <label>Picture</label>
          <input placeholder='Photo' type='text' className='inputForm' {...register('photo')} />
          <ErrorMessage message={errors.photo?.message} />
          <label>Catégory</label>
          <select id='categories-select' className='selectOptions' {...register('category')}>
            <option value='Artwork'>Artwork</option>
            <option value='Utilities'>Utilities</option>
            <option value='Metavers'>Metavers</option>
          </select>

          {errorMessage && <small className={styles.textDanger}>{errorMessage}</small>}
          <div>
            <button type='submit' className='btnSecondary'>
              {formLabels.label}
            </button>
            {isEdit && picture && (
              <button type='submit' className='btnAlert' onClick={() => handleDelete(picture.id)}>
                Delete
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
