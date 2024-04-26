import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(userActions.logout());
    navigate('/auth/login');
  };

  return (
    <div className={styles['layout']}>
      <div className={styles['sidebar']}>
        <div className={styles['user']}>
          <img className={styles['avatar']} src='/avatar.png' alt='Аватар пользователя' />
          <div className={styles['name']}>Василий Иванов</div>
          <div className={styles['email']}>vasya@mail.ru</div>
        </div>
        <div className={styles['menu']}>
          <NavLink
            className={({ isActive }) =>
              cn(styles['link'], {
                [styles.active]: isActive,
              })
            }
            to='/'
          >
            <img src='/menu-icon.svg' alt='Иконка меню' />
            Меню
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              cn(styles['link'], {
                [styles.active]: isActive,
              })
            }
            to='/cart'
          >
            <img src='/cart-icon.svg' alt='Иконка корзины' />
            Корзина
          </NavLink>
        </div>
        <Button className={styles['exit']} onClick={logout}>
          <img src='/exit-icon.svg' alt='Иконка выхода' />
          Выход
        </Button>
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}
