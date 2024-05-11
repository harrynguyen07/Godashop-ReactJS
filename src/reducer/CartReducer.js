import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, UPDATE_QTY } from "../const/CartConstant";
import { pre_add_to_cart, pre_remove_from_cart, pre_update_to_cart } from "../helper/ultil";

const cart = localStorage.getItem('cart');
let initialSate;
if (!cart) {
    initialSate = { cartItems: [] };
}
else {
    // chuyển ngược lại từ chuỗi thành object
    initialSate = JSON.parse(cart);
}


const CartReducer = (state = initialSate, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            {

                const newCart = {
                    cartItems: pre_add_to_cart(state.cartItems, action.payload)
                }
                // Lưu xuống Storage của trình duyệt, để lần sau mở trình duyệt web lên nó vẫn còn giỏ hàng
                localStorage.setItem('cart', JSON.stringify(newCart));
                return newCart;
            }


        case REMOVE_FROM_CART:
            {

                const newCart = {
                    cartItems: pre_remove_from_cart(state.cartItems, action.payload.id)
                }
                // Lưu xuống Storage của trình duyệt, để lần sau mở trình duyệt web lên nó vẫn còn giỏ hàng
                localStorage.setItem('cart', JSON.stringify(newCart));
                return newCart;
            }

        case UPDATE_QTY:
            {

                const newCart = {
                    cartItems: pre_update_to_cart(state.cartItems, action.payload)
                }
                // Lưu xuống Storage của trình duyệt, để lần sau mở trình duyệt web lên nó vẫn còn giỏ hàng
                localStorage.setItem('cart', JSON.stringify(newCart));
                return newCart;
            }


        case EMPTY_CART:
            {

                const newCart = {
                    cartItems: []
                }
                // Lưu xuống Storage của trình duyệt, để lần sau mở trình duyệt web lên nó vẫn còn giỏ hàng
                localStorage.removeItem('cart');
                return newCart;
            }

        default:
            return state;
    }
}
export default CartReducer;