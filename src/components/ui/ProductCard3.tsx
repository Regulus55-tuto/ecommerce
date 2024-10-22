import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TagIcon } from "@heroicons/react/16/solid";
import { ProductType } from "utiles/interfaces";
import { smartphone } from "data/Products/collectionsData";

interface ProductCardProps {
  title: string;
  model: string;
  referencePrice: number;
  promotionalPrice: number;
  category: string;
  id?: number;
  image?: string[];
  description: string;
  highlights?: string[];
  details?: string;
  tags?: string;
  colors?: string[];
  colorbuttons?: string[];
  options?: string;
}

const ProductCard3 = ({
  title,
  model,
  referencePrice,
  promotionalPrice,
  category,
  id,
  image,
  description,
  highlights,
  details,
  colors,
  colorbuttons,
  tags,
}: ProductCardProps) => {
  const formattedReferencePrice = referencePrice.toLocaleString();
  const formattedPromotionalPrice = promotionalPrice.toLocaleString();

  if (!id) {
    return <h1>Product Empty</h1>;
  }
  return (
    <Link
      to={`/products/${id}`}
      state={{
        title,
        model,
        referencePrice,
        promotionalPrice,
        category,
        id,
        colors,
        image,
        description,
        highlights,
        details,
        tags,
      }}
    >
      <div
        className={
          "relative isolate overflow-hidden rounded-2xl bg-gray-100 pt-[100%]"
        }
      >
        <div className={"absolute inset-0 translate-x-1/2 translate-y-1/2"}>
          <LazyLoadImage
            src={image && Array.isArray(image) ? image[0] : image}
            alt={title}
            className={
              "absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75 "
            }
          />
        </div>
      </div>

      <div className={"p-5"}>
        <h3 className={"text-center text-lg font-bold text-gray-900"}>
          {title}
        </h3>
        <h5 className="text-center text-xs text-gray-500">{model}</h5>

        <div
          className={`grid my-2 ${
            colors?.length === 1
              ? "grid-cols-1"
              : colors?.length === 2
              ? "grid-cols-2"
              : colors?.length === 3
              ? "grid-cols-3"
              : "grid-cols-4"
          }`}
        >
          {colorbuttons?.map((color) => (
            // <div
            //   className="border-2 rounded-lg bg-white mx-1 py-1"
            //   style={{ border: `2px solid ${color}` }}
            // >
            <div
              onClick={(e) => e.stopPropagation}
              className="text-center rounded-lg h-8 border-2 mx-1 "
              style={{ backgroundColor: color }}
            />
            // </div>
          ))}
        </div>

        <div className={"flex items-center justify-center pt-8 "}>
          <div
            className={
              "relative rounded-lg border-2 border-gray-400 h-8 w-auto max-w-40 px-2"
            }
          >
            <span className={"absolute bottom-9 px-2 text-xs text-gray-400"}>
              Reference Price
            </span>
            <p className={"text-lg  text-gray-500"}>
              ₩ {formattedReferencePrice}
            </p>
          </div>

          <div
            className={
              "relative rounded-lg border-2 border-violet-500 px-2 py-1 ml-4"
            }
          >
            <span className={"absolute bottom-10 px-2 text-xs text-violet-400"}>
              Promotional Price
            </span>
            <p className={"text-lg font-bold text-violet-500"}>
              ₩ {formattedPromotionalPrice}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard3;
