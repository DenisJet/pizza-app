import { Await, Link, useLoaderData, useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import Headling from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import styles from './Product.module.css';

export function Product() {
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState<string | undefined>();
  const productId = useParams().id;
  const data = useLoaderData() as { data: Product };

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
                <Button className={styles['cart-button']}>
                  <img src='/cart-button-icon.svg' alt='иконка корзины' />В корзину
                </Button>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
