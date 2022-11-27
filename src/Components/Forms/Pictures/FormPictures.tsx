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
    title: !isEdit ? 'Create a new Picture' : 'Edit the picture details of ' + picture?.artist,
    label: !isEdit ? 'Create' : 'Edit',
  };

  const dispatch = useDispatch();

  const naviguate = useNavigate();

  // const getRandomPictures: string = Math.floor(Math.random() * 300).toString();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPictures>({
    defaultValues: {
      id: isEdit ? picture?.id : '',
      artist: isEdit ? picture?.artist : '',
      authorID: isEdit ? picture?.authorID : '',
      category: isEdit ? picture?.category : '',
      photo: isEdit ? picture?.photo : '',
      year: isEdit ? picture?.year : '',
    },
    resolver: yupResolver(pictureValidator),
  });

  const onSubmit: SubmitHandler<IPictures> = async (formValues: IPictures): Promise<void> => {
    if (!isUserConnect) return;
    try {
      formValues.id = uuidv4();
      formValues.authorID = isUserConnect;
      let response: AxiosResponse;
      if (!isEdit) {
        response = await axios.post(URL + 'pictures', formValues);
      } else {
        const id: string = location.pathname.slice(16);
        response = await axios.put(URL + 'pictures' + id, formValues);
        console.log('id', id, 'res', response);
      }
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
          <button type='submit' className='btnSecondary'>
            {formLabels.label}
          </button>
        </div>
      </form>
    </>
  );
}
