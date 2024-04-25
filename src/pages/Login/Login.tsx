import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import axios, { AxiosError } from 'axios';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const [error, setError] = useState<string | null>();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${PREFIX}/auth`, { email, password });
      console.log(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className={styles['login']}>
      <Headling>Вход</Headling>
      {error && <div className={styles['error']}>{error}</div>}
      <form className={styles['form']} onSubmit={submit}>
        <div className={styles['field']}>
          <label htmlFor='email'>Ваш email</label>
          <input id='email' name='email' type='text' placeholder='Email' />
        </div>
        <div className={styles['field']}>
          <label htmlFor='password'>Ваш пароль</label>
          <input id='password' name='password' type='password' placeholder='Пароль' />
        </div>
        <Button appearence='big'>Вход</Button>
      </form>
      <div className={styles['links']}>
        <div>Нет аккаунта?</div>
        <Link to='/auth/register'>Зарегистрироваться</Link>
      </div>
    </div>
  );
}
