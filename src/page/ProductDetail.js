import React, { useEffect, useState } from 'react';
import CatSideBar from '../component/CatSideBar';
import PriceSidebar from '../component/PriceSidebar';
import { axiosNonAuthInstance, getProductId } from '../helper/ultil';
import ProductInner from '../component/ProductInner';
import Loading from '../component/Loading';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {

    const { slug } = useParams();
    const productId = getProductId(slug);

    const priceRange = '';
    const handlePrice = (priceRange) => {
        // update later
    }

    const [product, setProduct] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);

    const getProduct = async () => {
        setIsLoaded(false); //reset lại trước khi call api
        try {
            const response = await axiosNonAuthInstance().get(`/products/${productId}`);
            setProduct(response.data);
            setIsLoaded(true);

        } catch (error) {
            console.log(error);
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <>
            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-9">
                            <ol className="breadcrumb">
                                <li><a href="/" target="_self">Trang chủ</a></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Kem Dưỡng Da</span></li>
                            </ol>
                        </div>
                        <div className="col-xs-3 hidden-lg hidden-md">
                            <a className="hidden-lg pull-right btn-aside-mobile" href="!">Bộ lọc <i className="fa fa-angle-double-right" /></a>
                        </div>
                        <div className="clearfix" />
                        <aside className="col-md-3">
                            <div className="inner-aside">
                                <CatSideBar categoryId={product?.category_id} />
                                <PriceSidebar handlePrice={handlePrice} priceRange={priceRange} />
                            </div>
                        </aside>
                        <div className="col-md-9 product-detail">
                            {isLoaded ? <ProductInner product={product} /> : <Loading />}

                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
