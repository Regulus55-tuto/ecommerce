import React from 'react';
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";

interface IProps {
    img: string;
    title: string;
    id: number;
    price?: number;
}

const ProductCard2 = ({id, title, img, price}:IProps) => {
    return (
        <Link to={`/products/${id}`}>
            <div className={'relative isolate overflow-hidden rounded-2xl bg-gray-100 pt-[100%]'}>
                <div className={'absolute inset-0 translate-x-1/2 translate-y-1/2'}>
                    <LazyLoadImage
                        src={img}
                        alt={title}
                        className={'absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75 '}
                    />
                </div>
            </div>
            <div className={'p-5'}>
                <h3 className={'text-center text-lg font-bold text-gray-900'}>
                    {title}
                </h3>
                 <div className={'flex items-center justify-center pt-5 '}>
                     <div className={'relative rounded-lg border-2 border-violet-500 px-2 py-1'}>
                         <span className={'absolute -top-3 bg-white px-2 text-xs text-violet-400'}>
                             Price
                         </span>
                         <p className={'text-lg font-bold text-violet-500'}>${price}.00</p>
                     </div>
                 </div>
            </div>
        </Link>
    );
};

export default ProductCard2;