import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
//import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const getMenu = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          setError(error.message);
        }
        setIsLoading(false);
        return;
      }
    };
    getMenu();
  }, []);

  return (
    <>
      <div className={styles['head']}>
        <Headling>Menu</Headling>
        {/* <Search placeholder='Введите блюдо или состав' /> */}
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && <MenuList products={products} />}
        {isLoading && <>Загрузка...</>}
      </div>
    </>
  );
}
