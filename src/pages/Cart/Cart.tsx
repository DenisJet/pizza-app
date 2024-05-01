import { useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { Product } from '../../interfaces/product.interface';
import { useState } from 'react';

export function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>();
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {}, [items]);

  return (
    <>
      <Headling>Корзина</Headling>
      {items.map((item) => (
        <CartItem />
      ))}
    </>
  );
}
