import React, { useEffect, useState } from 'react';
import { axiosNonAuthInstance, createLinkCategory } from '../helper/ultil';
import { Link, NavLink } from 'react-router-dom';
import Loading from './Loading';


export default function CatSideBar({ categoryId }) {
    const [categoies, setCategoies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const getCategoies = async () => {
        try {

            const response = await axiosNonAuthInstance().get(`/categories`)
            setCategoies(response.data.items);
            setIsLoaded(true);

        } catch (error) {
            console.log(error);
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        getCategoies();
    }, []);


    return (
        <>
            <div className="category">
                <h5>Danh mục sản phẩm</h5>
                <ul>
                    <li >
                        <NavLink to="/san-pham.html" title="Tất cả sản phẩm" target="_self">Tất cả sản phẩm
                        </NavLink>
                    </li>
                    {/* Loop */}
                    {
                        isLoaded ? categoies.map((category, index) =>
                            <li key={index}>
                                {/* /danh-muc/kem-danh-rang-2 */}
                                <Link className={categoryId === category.id ? 'active' : ''} to={createLinkCategory(category)} title={category.name} target="_self">{category.name}</Link>
                            </li>
                        )
                            : <Loading />
                    }


                </ul>
            </div>
        </>
    );
}
