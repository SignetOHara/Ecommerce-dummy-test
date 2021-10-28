import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Realm from 'realm-web';

import Header from '../../components/Header/Header';
import Container from '../../components/Container/Container';
import Footer from '../../components/Footer/Footer';
import ProductDetail from '../../components/Product/ProductDetail';

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const { query } = useRouter();

  useEffect(async () => {
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const oneProduct = await user.functions.getOneProduct(query.id);
      setProduct(() => oneProduct);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {product && (
        <>
          <Head>
            <title>DUMMY Booze-Store E-Commerce Demo - {product.name}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="bg-white w-full min-h-screen">
            <Header />
            <Container>
              <ProductDetail product={product} />
            </Container>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
