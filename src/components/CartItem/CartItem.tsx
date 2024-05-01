import styles from './ProductCard.module.css';
import { CartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  const decrease = () => {
    dispatch(cartActions.add(props.id));
  };

  const remove = () => {
    dispatch(cartActions.add(props.id));
  };

  return (
    <div className={styles['item ']}>
      <div className={styles['image']} style={{ backgroundImage: `url('${props.image}')` }}></div>
      <div className={styles['description']}>
        <div className={styles['name']}>{props.name}</div>
        <div className={styles['currency']}>{props.price}&nbsp; ₽</div>
      </div>
      <div className={styles['actions']}>
        <button className={styles['button']} onClick={decrease} type='button'>
          <img src='/cart-button-icon.svg' alt='Удалить из корзину' />
        </button>
        <div>{props.count}</div>
        <button className={styles['button']} onClick={increase} type='button'>
          <img src='/cart-button-icon.svg' alt='Добавить в корзину' />
        </button>
        <button className={styles['remove']} onClick={remove} type='button'>
          <img src='/delete-icon.svg' alt='Удалить все' />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
