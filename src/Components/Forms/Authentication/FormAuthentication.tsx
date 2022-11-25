import styles from './FormAuthentication.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from 'Services/Utils/Interfaces/i-user';
import { yupResolver } from '@hookform/resolvers/yup';
import { authValidator } from 'Services/Utils/Validators/authenticationValidator';
import 'Assets/Styles/Global/Button.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function FormAuthentication(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(authValidator),
  });

  const naviguate = useNavigate();

  const onSubmit: SubmitHandler<IUser> = async (formValues: IUser): Promise<void> => {
    try {
      formValues.id = uuidv4();
      const response: AxiosResponse = await axios.post(
        'http://localhost:5000/' + 'user',
        formValues,
      );
      delete response.data.password;
      localStorage.setItem('user_id', response.data.id);
      localStorage.setItem('user_email', response.data.email);
      naviguate('/');
    } catch (error: any | AxiosError) {
      setErrorMessage('Try again later please');
      throw new Error('error', error);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Sign in</h1>
      <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder='
          Email'
          className={styles.formInputAuthentication}
          {...register('email')}
        />
        <small className={styles.textDanger}>{errors.email?.message}</small>

        <input
          placeholder='Password'
          type='password'
          className={styles.formInputAuthentication}
          {...register('password')}
        />
        <small className={styles.textDanger}>{errors.password?.message}</small>

        {errorMessage && <small className={styles.textDanger}>{errorMessage}</small>}
        <div className={styles.formBtnSection}>
          <button type='submit' className='btnPrimary'>
            Send
          </button>
        </div>
      </form>
    </>
  );
}
