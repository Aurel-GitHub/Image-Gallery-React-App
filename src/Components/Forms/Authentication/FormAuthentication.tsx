import styles from './FormAuthentication.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from 'Services/Utils/Interfaces/i-user';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  signinValidator,
  signupValidator,
} from 'Services/Utils/Validators/authenticationValidator';
import 'Assets/Styles/Global/Button.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function FormAuthentication(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);

  const env: string | undefined = process.env.REACT_APP_SERVER_URL;
  const title: string = isCreateAccount ? 'Sign up' : 'Sign in';
  const sentence: string = isCreateAccount ? 'Sign in ?' : 'Sign up ?';
  const handleValidator = isCreateAccount ? signupValidator : signinValidator;

  const naviguate = useNavigate();

  const handleForm = (): void => {
    setIsCreateAccount(isCreateAccount ? false : true);
    setErrorMessage('');
    reset();
  };

  const hasAccessAuthentication = async (
    emailFormValue: string,
    passwordFormValue: string,
  ): Promise<boolean> => {
    try {
      const response = await axios.get(env + 'users');
      const usersList: IUser[] = response.data;
      const isEmailExist: boolean = usersList?.some((elt) => elt.email === emailFormValue);
      const isPasswordExist: boolean = usersList?.some((elt) => elt.password === passwordFormValue);

      if (isCreateAccount && !isEmailExist) {
        return true;
      } else if (!isCreateAccount && isEmailExist && isPasswordExist) {
        return true;
      } else {
        setErrorMessage('Input error, please try again');
        return false;
      }
    } catch (error: AxiosError | any) {
      throw new Error();
    }
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(handleValidator),
  });

  const onSubmit: SubmitHandler<IUser> = async (formValues: IUser): Promise<void> => {
    try {
      const isAccess: boolean = await hasAccessAuthentication(
        formValues.email,
        formValues.password,
      );
      let response: AxiosResponse;
      if (!isAccess) return;
      if (isCreateAccount) {
        formValues.id = uuidv4();
        response = await axios.post(env + 'users', formValues);
      } else {
        response = await axios.post(env + 'users', formValues);
      }
      localStorage.setItem('token', response.data.id);
      localStorage.setItem('firstname', response.data.email);
      naviguate('/');
    } catch (error: AxiosError | any) {
      setErrorMessage('Try again later please');
      throw new Error(error);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
        {isCreateAccount && (
          <>
            <input
              placeholder='Firstname'
              className={styles.formInputAuthentication}
              {...register('firstname')}
            />
            <small className={styles.textDanger}>{errors.firstname?.message}</small>
          </>
        )}

        <input
          placeholder='Email'
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
          <small className={styles.handleForm} onClick={handleForm}>
            {sentence}
          </small>
        </div>
      </form>
    </>
  );
}
