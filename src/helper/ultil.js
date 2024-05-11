import axios from "axios";
import slugify from "react-slugify";
import numeral from 'numeral';
import 'numeral/locales';
numeral.locale('vi')

// newParams là object
export const updateParam = (searchParams, setSearchParams, newParams) => {
    let params = {}
    // searchParams chứa param hiện tại trên thanh địa chỉ web
    for (const [key, value] of searchParams.entries()) {
        // key là tên param, value là giá trị của param đó
        // vd: page=2&search=ty thì tên param là page, giá trị là 2
        params[key] = value;
    }

    // thêm mới param, dùng es6 (spread)
    // searchParams = {page: 2, conga: 3}
    // newParams = {search: 'Ty', concho: 4}
    // params = {page: 2, conga: 3, search: 'Ty', concho: 4}
    params = { ...params, ...newParams };

    // cập nhật param trên thanh địa chỉ
    setSearchParams(params);
}

export const getAuthInfo = () => {
    const authInfo = localStorage.getItem('authInfo');
    let initialSate;
    if (!authInfo) {
        initialSate = { isLogin: false, access_token: null, loggedUser: null };
    }
    else {
        // chuyển ngược lại từ chuỗi thành object
        initialSate = JSON.parse(authInfo);
    }
    return initialSate;
}

export const axiosAuthInstance = () => axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: `Bearer ${getAuthInfo().access_token}`
    }
})

export const axiosNonAuthInstance = () => axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

export const getCategoryId = (slug) => {
    if (!slug) return '';
    const slugParts = slug.split('-');
    const categoryId = slugParts.pop();
    return categoryId;
}

export const createLinkCategory = (category) => {
    return `/danh-muc/${slugify(category.name + '-' + category.id)}`;

}


export const createLinkProduct = (product) => {
    return `/san-pham/${slugify(product.name + '-' + product.id)}.html`;
}

export const createLinkOrderDetail = (order) => {
    return `/don-hang/chi-tiet-don-hang-${order.id}.html`;
}

export const getProductId = (slug) => {
    if (!slug) return '';
    const slugParts = slug.split('.html');
    const leftParts = slugParts[0];
    const parts = leftParts.split('-')
    const productId = parts.pop();
    return productId;
}

export const formatMoney = (money) => {
    return numeral(money).format('0,0');

}


export const getOrderId = (slug) => {
    if (!slug) return '';
    const slugParts = slug.split('.html');
    const leftParts = slugParts[0];
    const parts = leftParts.split('-')
    const oderId = parts.pop();
    return oderId;
}

// Hàm thêm 1 sản phẩm vào giỏ hàng
export const pre_add_to_cart = (arr, input) => {
    // kiểm tra xem có bị trùng không, và trả về chỉ số của phần tử bị trùng
    // nếu không trùng trả về giá trị -1
    // giúp tăng tốc tính toán, không ảnh hưởng đến state trước
    const newArray = JSON.parse(JSON.stringify(arr))

    const index = newArray.findIndex((item) => item.id === input.id);
    if (index !== -1) {
        newArray[index].qty += Number(input.qty);
    }
    else {
        newArray.push(input);
    }

    return newArray;
}

// Hàm thêm 1 sản phẩm vào giỏ hàng
export const pre_remove_from_cart = (arr, id) => {
    // kiểm tra xem có bị trùng không, và trả về chỉ số của phần tử bị trùng
    // nếu không trùng trả về giá trị -1
    // giúp tăng tốc tính toán, không ảnh hưởng đến state trước
    const newArray = JSON.parse(JSON.stringify(arr))

    const index = newArray.findIndex((item) => item.id === id);
    if (index !== -1) {
        newArray.splice(index, 1)
    }


    return newArray;
}


// Hàm update sản phẩm đã có vào giỏ hàng
export const pre_update_to_cart = (arr, input) => {
    // kiểm tra xem có bị trùng không, và trả về chỉ số của phần tử bị trùng
    // nếu không trùng trả về giá trị -1
    // giúp tăng tốc tính toán, không ảnh hưởng đến state trước
    const newArray = JSON.parse(JSON.stringify(arr))

    const index = newArray.findIndex((item) => item.id === input.id);
    if (index !== -1) {
        newArray[index].qty = Number(input.qty);
    }
    else {
        newArray.push(input);
    }

    return newArray;
}