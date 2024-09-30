import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
// 인터페이스 만들어야
interface IProps {
  id?: string;
  title: string;
  price: number;
  img: string;
}

const ProductCard = ({ id, title, price, img }: IProps) => {
  return (
    <Link to={`/products/${id}`}>
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 pt-[100%]">
        <div className="absolute inset-0 translate-x-1/2 translate-y-1/2">
          <LazyLoadImage
            src={img && Array.isArray(img) ? img[0] : img}
            alt={title}
            // effect="blur"
            className="absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
          />
        </div>
      </div>
      <div className="p-5">
        <h3 className="border-b border-gray-200 pb-4 text-lg font-bold text-gray-900">
          {title}
        </h3>

        <div className="flex items-end justify-between pt-5">
          <div className="relative rounded-lg border-2 border-violet-500 px-2 py-1">
            <span className="absolute -top-3 bg-white px-2 text-xs text-violet-400">
              Price
            </span>
            <p className=" text-lg font-bold text-violet-500">${price}.00</p>
          </div>

          {/*<p className="flex items-center text-sm text-gray-500">*/}
          {/*    <TagIcon className="mr-2 h-4 w-4"/>*/}
          {/*    {tags}*/}
          {/*</p>*/}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
