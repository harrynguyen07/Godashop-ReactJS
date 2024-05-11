import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createLinkProduct, formatMoney } from '../helper/ultil';
import DeliveryInfo from '../component/DeliveryInfo';

export default function Checkout() {
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const subtotalPrice = cartItems.reduce((total, item) => total + Number(item.sale_price * item.qty), 0)
    return (
        <>
            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <ol className="breadcrumb">
                                <li><a href="/" target="_self">Giỏ hàng</a></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Thông tin giao hàng</span></li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <aside className="col-md-6 cart-checkout">
                            {
                                cartItems.map(item =>
                                    <>
                                        <div className="row">
                                            <div className="col-xs-2">
                                                <img className="img-responsive" src={item.featured_image} alt={item.name} />
                                            </div>
                                            <div className="col-xs-7">
                                                <Link className="product-name" to={createLinkProduct(item)}>{item.name}</Link>
                                                <br />
                                                <span>{item.qty}</span> x <span>{formatMoney(item.sale_price)}₫</span>
                                            </div>
                                            <div className="col-xs-3 text-right">
                                                <span>{formatMoney(item.sale_price * item.qty)}₫</span>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                )
                            }



                            <div className="row">
                                <div className="col-xs-6">
                                    Tạm tính
                                </div>
                                <div className="col-xs-6 text-right">
                                    {formatMoney(subtotalPrice)}₫
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-6">
                                    Phí vận chuyển
                                </div>
                                <div className="col-xs-6 text-right">
                                    <span className="shipping-fee" >{formatMoney(50000)}₫</span>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-xs-6">
                                    Tổng cộng
                                </div>
                                <div className="col-xs-6 text-right">
                                    <span className="payment-total">{formatMoney(subtotalPrice + 50000)}₫</span>
                                </div>
                            </div>
                        </aside>
                        <DeliveryInfo />
                    </div>
                </div>
            </main>

        </>
    );
}
