import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as Realm from 'realm-web';
import Header from '../../components/Header/Header';
import Container from '../../components/Container/Container';
import Category from '../../components/Category/Category';
import Products from '../../components/Products/Products';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { query } = useRouter();

  // don't have async function with useEffect
  useEffect(async () => {
    if (query.term) {
      // add your Realm App Id to the .env.local file
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const searchProducts = await user.functions.searchProducts(query.term);
        setProducts(() => searchProducts);
      } catch (error) {
        console.error(error);
      }
    }
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>DUMMY Booze Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white w-full min-h-screen">
        <Header />
        <Container>
          <Category
            category="Products Found"
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
