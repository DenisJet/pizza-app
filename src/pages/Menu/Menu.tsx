import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await fetch(`${PREFIX}/products`);
        if (!res.ok) {
          return;
        }
        const data = (await res.json()) as Product[];
        setProducts(data);
        console.log(products);
      } catch (error) {
        console.error(error);
        return;
      }
    };
    getMenu();
  }, [products]);

  return (
    <>
      <div className={styles['head']}>
        <Headling>Menu</Headling>
        <Search placeholder='Введите блюдо или состав' />
      </div>
      <div>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.ingredients.join(', ')}
            rating={product.rating}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </>
  );
}
