import { LOGIN, LOGOUT, UPDATE_LOGGED_USER } from "../const/AuthConstant";

const authInfo = localStorage.getItem('authInfo');
let initialSate;
if (!authInfo) {
    initialSate = { isLogin: false, access_token: null, loggedUser: null };
}
else {
    // chuyển ngược lại từ chuỗi thành object
    initialSate = JSON.parse(authInfo);
}
// state lưa 3 thông tin {isLogin, access_token,loggedUser}
// isLogin để biết rằng đã login thành công vào hệ thống chưa?
// access_token để lấy dữ liệu (student, subject, register)
// loggedUser để hiển thị thông tin người đăng nhập trên trang web 
// current state + action => new state

const AuthReducer = (state = initialSate, action) => {
    switch (action.type) {
        case LOGIN:
            {
                const new_state = {
                    isLogin: true,
                    access_token: action.payload.access_token,
                    loggedUser: action.payload.loggedUser
                };
                // lưu xuống localStorage của trình duyệt
                localStorage.setItem('authInfo', JSON.stringify(new_state));
                return new_state;
            }
        case LOGOUT:
            {
                const new_state = {
                    isLogin: false,
                    access_token: null,
                    loggedUser: null
                };
                localStorage.setItem('authInfo', JSON.stringify(new_state));
                return new_state
            }

        case UPDATE_LOGGED_USER:
            {
                const new_state = {
                    ...state,
                    loggedUser: action.payload.loggedUser
                };
                // lưu xuống localStorage của trình duyệt
                localStorage.setItem('authInfo', JSON.stringify(new_state));
                return new_state;
            }


        default:
            return state;
    }
}
export default AuthReducer;