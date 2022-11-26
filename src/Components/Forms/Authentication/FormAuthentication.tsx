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
import URL from 'Services/Utils/Constants/url';
import ErrorMessage from 'Components/ErrorMessage/ErrorMessage';
import 'Assets/Styles/Global/Inputs.css';

export default function FormAuthentication(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  const handleValidator = isCreateAccount ? signupValidator : signinValidator;
  const formLabels: { title: string; sentence: string } = {
    title: isCreateAccount ? 'Sign up' : 'Sign in',
    sentence: isCreateAccount ? 'Sign in ?' : 'Sign up ?',
  };

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
      const response = await axios.get(URL + 'users');
      const usersList: IUser[] = response.data;

      const isEmailExist: boolean = usersList?.some((elt) => elt.email === emailFormValue);
      const isPasswordExist: boolean = usersList?.some((elt) => elt.password === passwordFormValue);

      if (isCreateAccount && !isEmailExist) {
        return true;
      } else if (!isCreateAccount && isEmailExist && isPasswordExist) {
        if (!usersList) return false;
        const user: IUser | undefined = usersList.find((elt) => elt.email === emailFormValue);
        if (!user) return false;
        localStorage.setItem('token', user.id || '');
        localStorage.setItem('firstname', user.firstname || '');
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
      const loginAuthorization: boolean = await hasAccessAuthentication(
        formValues.email,
        formValues.password,
      );
      if (!loginAuthorization) return;
      let response: AxiosResponse;
      if (isCreateAccount) {
        formValues.id = uuidv4();
        formValues.email.trim();
        response = await axios.post(URL + 'users', formValues);
        localStorage.setItem('token', response.data.id);
        localStorage.setItem('firstname', response.data.email);
      }
      naviguate('/');
    } catch (error: AxiosError | any) {
      setErrorMessage('Try again later please');
      throw new Error(error);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>{formLabels.title}</h1>
      <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
        {isCreateAccount && (
          <>
            <input placeholder='Firstname' className='inputForm' {...register('firstname')} />
            <ErrorMessage message={errors.firstname?.message} />
          </>
        )}

        <input placeholder='Email' className='inputForm' {...register('email')} />
        <ErrorMessage message={errors.email?.message} />

        <input
          placeholder='Password'
          type='password'
          className='inputForm'
          {...register('password')}
        />
        <ErrorMessage message={errors.password?.message} />

        {errorMessage && <small className={styles.textDanger}>{errorMessage}</small>}

        <div className={styles.formBtnSection}>
          <button type='submit' className='btnSecondary'>
            {formLabels.title}
          </button>
          <small className={styles.handleForm} onClick={handleForm}>
            {formLabels.sentence}
          </small>
        </div>
      </form>
    </>
  );
}
