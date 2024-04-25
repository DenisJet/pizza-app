import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import styles from './Login.module.css';
import { FormEvent } from 'react';

export function Login() {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className={styles['login']}>
      <Headling>Вход</Headling>
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
