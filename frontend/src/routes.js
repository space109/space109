import { Navigate, useRoutes } from 'react-router-dom';
import MainLayout from './layouts/main';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import NotFound from './pages/Page404';
import Main from './pages/Main';
import Items from './pages/Items';
import ItemRegistration from './pages/ItemRegistration';
import SaleRegistration from './pages/SaleRegistration';
import WhosArt from './pages/WhosArt';
import ItemPurchase from './pages/ItemPurchase';

// 화면 라우팅 테이블
export default function Router() {
  return useRoutes([
    {
      path: '/main',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/main" replace /> },
        { path: '', element: <Main /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/main" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/items',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/items" replace /> },
        { path: '', element: <Items /> },
        { path: 'buy/:tokenId', element: <ItemPurchase /> }
      ]
    },
    {
      path: '/register',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/register" replace /> },
        { path: '', element: <ItemRegistration /> },
        { path: 'sale/:tokenId', element: <SaleRegistration /> }
      ]
    },
    {
      path: '/whosart',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/whosart" replace /> },
        { path: '', element: <WhosArt /> },
        { path: ':address', element: <WhosArt /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
