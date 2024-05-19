import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { ProductPage } from './pages/Product/Product.tsx';
import { PREFIX } from './helpers/API.ts';
import axios from 'axios';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Success } from './pages/Success/Success.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <RequireAuth>
          <Layout />
        </RequireAuth>
      ),
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<>Загрузка...</>}>
              <Menu />
            </Suspense>
          ),
        },
        { path: '/success', element: <Success /> },
        { path: '/cart', element: <Cart /> },
        {
          path: '/product/:id',
          element: <ProductPage />,
          errorElement: <>Ошибка загрузки</>,
          loader: async ({ params }) => {
            return defer({
              data: new Promise((resolve, reject) => {
                setTimeout(() => {
                  axios
                    .get(`${PREFIX}/products/${params.id}`)
                    .then((data) => resolve(data))
                    .catch((e) => reject(e));
                }, 1000);
              }),
            });
          },
          // loader: async ({ params }) => {
          //   return defer({
          //     data: axios.get(`${PREFIX}/products/${params.id}`).then((data) => data),
          //   });
          // },
        },
      ],
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
    { path: '*', element: <ErrorPage /> },
  ]
  // {
  //   basename: 'https://denis-pizza-app.netlify.app',
  // }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
