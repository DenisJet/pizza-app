import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles['login']}>
      <Headling>Вход</Headling>
      {loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
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
