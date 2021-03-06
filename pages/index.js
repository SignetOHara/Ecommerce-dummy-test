import Head from 'next/head';
import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import Header from '../components/Header/Header';
import Container from '../components/Container/Container';
import Hero from '../components/Hero/Hero';
import Category from '../components/Category/Category';
import Products from '../components/Products/Products';
import Pagination from '../components/Pagination/Pagination';
import Footer from '../components/Footer/Footer';

export default function Home() {
  const [products, setProducts] = useState([]);

  // don't have async function with useEffect
  useEffect(async () => {
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();

    try {
      const user = await app.logIn(credentials);
      const allProducts = await user.functions.getAllProducts();
      setProducts(() => allProducts);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>DUMMY Booze Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white w-full min-h-screen">
        <Header />
        <Container>
          <Hero />
          <Category
            category="Lager"
            categoryCount={`${products.length} Products`}
          />
          <Products products={products} />
          <Pagination />
        </Container>
        <Footer />
      </div>
    </div>
  );
}
