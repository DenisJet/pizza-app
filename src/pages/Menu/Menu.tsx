import { ChangeEvent, useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';
import Search from '../../components/Search/Search';

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const getMenu = async (query?: string) => {
    try {
      setIsLoading(true);
      if (query) {
        const { data } = await axios.get<Product[]>(`${PREFIX}/products?name=${query}*`);
        setProducts(data);
      } else {
        const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
        setProducts(data);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className={styles['head']}>
        <Headling>Menu</Headling>
        <Search placeholder='Введите название...' onChange={updateFilter} />
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && <MenuList products={products} />}
        {isLoading && <>Загрузка...</>}
      </div>
    </>
  );
}
