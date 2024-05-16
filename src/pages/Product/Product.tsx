import { Await, Link, useLoaderData, useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import Headling from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import styles from './Product.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export function Product() {
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState<string | undefined>();
  const productId = Number(useParams().id);
  const data = useLoaderData() as { data: Product };
  const dispatch = useDispatch<AppDispatch>();

  const getProduct = async () => {
    try {
      const { data } = await axios.get<Product>(`${PREFIX}/products/${productId}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.message);
      }
      return;
    }
  };

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
                <Link className={styles['back-link']} to='/'>
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
                      {data.ingredients.map((ingredient) => (
                        <li>{ingredient}</li>
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
