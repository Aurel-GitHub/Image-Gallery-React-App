import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import URL from 'Services/Utils/Constants/url';
import { IFormPictures, IPictures } from 'Services/Utils/Interfaces';
import { pictureValidator } from 'Services/Utils/Validators/picturesValidator';
import styles from './FormPictures.module.css';
import { v4 as uuidv4 } from 'uuid';
import { isUserConnect } from 'Services/Utils/Constants';
import { useDispatch } from 'react-redux';
import { addPicture } from 'Services/Redux/Features/picturesSlice';
import ErrorMessage from 'Components/ErrorMessage/ErrorMessage';
import 'Assets/Styles/Global/Inputs.css';

export default function FormPictures({ isEdit, picture }: IFormPictures): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formLabels: { title: string; label: string } = {
    title: !isEdit ? 'Create a new Picture' : 'Edit' + picture?.artist + 's picture',
    label: !isEdit ? 'Create' : 'Edit',
  };

  const dispatch = useDispatch();

  const naviguate = useNavigate();

  const getRandomPictures: string = Math.floor(Math.random() * 300).toString();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPictures>({
    resolver: yupResolver(pictureValidator),
  });

  const onSubmit: SubmitHandler<IPictures> = async (formValues: IPictures): Promise<void> => {
    try {
      formValues.id = uuidv4();
      if (isUserConnect) formValues.authorID = isUserConnect;
      const response: AxiosResponse = await axios.post(URL + 'pictures', formValues);
      dispatch(addPicture(response.data));
      naviguate('/');
    } catch (error: AxiosError | any) {
      setErrorMessage('Try again later please');
      throw new Error(error);
    } finally {
      reset();
    }
  };

  return (
    <>
      <>
        <h1 style={{ textAlign: 'center' }}>{formLabels.title}</h1>
        <form className={styles.formPicture} onSubmit={handleSubmit(onSubmit)}>
          <label>Artist</label>
          <input
            placeholder='Artist'
            type='text'
            className='inputForm'
            defaultValue={isEdit ? picture?.artist : ''}
            {...register('artist')}
          />
          <ErrorMessage message={errors.artist?.message} />

          <label>Year</label>
          <input
            placeholder='Year'
            type='number'
            defaultValue={isEdit ? picture?.year : 0}
            className='inputForm'
            {...register('year')}
          />
          <ErrorMessage message={errors.year?.message} />

          <label>Picture</label>
          <input
            placeholder='Photo'
            type='text'
            defaultValue={
              isEdit ? picture?.photo : 'https://picsum.photos/400/' + getRandomPictures
            }
            className='inputForm'
            {...register('photo')}
          />
          <ErrorMessage message={errors.photo?.message} />

          <label>Catégory</label>
          <select id='categories-select' {...register('category')}>
            <option value='Artwork'>Artwork</option>
            <option value='Utilities'>Utilities</option>
            <option value='Metavers'>Metavers</option>
          </select>

          {errorMessage && <small className={styles.textDanger}>{errorMessage}</small>}
          <button type='submit' className='btnSecondary'>
            Send
          </button>
        </form>
      </>
    </>
  );
}
