import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import ProductTitle from "../ui/ProductTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import {
  NFT_BREAK_POINTS,
  NFT_LOADING_ARRAY,
} from "../../data/Home/SlideOptions";
import { productData } from "../../data/layout/LayoutData";
import ProductCard from "../ui/ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GalaxySlide = () => {
  return (
    <section className={"mx-auto mt-12 w-full max-w-7xl py-4 md:mt-20"}>
      <div className={"flex items-center justify-between px-6"}>
        <ProductTitle title={"New arrivals"} className={"mb-6 px-6 sm:mb-10"} />
        <div className={"hidden items-center justify-center sm:flex"}>
          <div
            className={
              "swiper-button image-swiper-button-prev mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300"
            }
          >
            <ChevronLeftIcon className={"h-6 w-6"} />
          </div>

          <div
            className={
              "swiper-button image-swiper-button-prev mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300"
            }
          >
            <ChevronRightIcon className={"h-6 w-6"} />
          </div>
        </div>
      </div>

      <Swiper
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "opacity-20",
        }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={NFT_BREAK_POINTS}
        modules={[Navigation]}
        className="relative overscroll-y-contain !px-6 !pt-6 !pb-2 sm:!pt-10"
      >
        {/*{NFT_LOADING_ARRAY.map((data)=>(*/}
        {/*    <SwiperSlide key={data} className={'group cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out'}>*/}
        {/*        <h1>1234</h1>*/}
        {/*    </SwiperSlide>*/}
        {/*))}*/}
        {productData.map(({ id, title, price, img }) => (
          <SwiperSlide
            key={id}
            className="group cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out"
          >
            <ProductCard title={title} price={price} img={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GalaxySlide;
