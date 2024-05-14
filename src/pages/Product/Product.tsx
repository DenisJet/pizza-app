import { Await, useLoaderData, useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';

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
        <Await resolve={data.data}>{({ data }: { data: Product }) => <>Product - {data.name}</>}</Await>
      </Suspense>
    </>
  );
}
