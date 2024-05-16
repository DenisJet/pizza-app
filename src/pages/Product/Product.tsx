import { Await, Link, useLoaderData, useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import Headling from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import styles from './Product.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export function ProductPage() {
  const productId = Number(useParams().id);
  const data = useLoaderData() as { data: Product };
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(productId));
  };

  return (
    <>
      <Suspense fallback={'Загрузка...'}>
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => (
            <>
              <div className={styles['line']}>
                <Link className={styles['back-link']} to='/' title='Назад'>
                  <img src='/arrow-back-icon.svg' width='25px' height='25px' alt='' />
                </Link>
                <Headling>{data.name}</Headling>
                <Button className={styles['cart-button']} onClick={add}>
                  <img src='/cart-button-icon.svg' alt='иконка корзины' />В корзину
                </Button>
              </div>
              <div className={styles['content']}>
                <img src={data.image} className={styles['image']} alt={data.name} />
                <div className={styles['text']}>
                  <div className={styles['price']}>
                    Цена{' '}
                    <span className={styles['currency']}>
                      {data.price} <span>₽</span>
                    </span>
                  </div>
                  <div className={styles['rating']}>
                    Рейтинг{' '}
                    <div className={styles['rate']}>
                      {data.rating} <img src='/star-icon.svg' alt='иконка звезды' />
                    </div>
                  </div>
                  <div className={styles['ingredients']}>
                    Состав:
                    <ul>
                      {data.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
