import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { classNames, removeCollectionsPrefix } from "../utiles/utiles";
import { FreeMode, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductType } from "../utiles/interfaces";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { RadioGroup } from "@headlessui/react";
import sizeFilter from "../components/Product/SizeFilter";
import { Button } from "../components/ui";
import { accessory, computer, smartphone } from "data/Products/collectionsData";

const ProductDetail = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const productId = removeCollectionsPrefix("/product/", pathname);
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);

  const [cartAdded, setCartAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [notice, setNotice] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([
    ...smartphone.aSeries,
    ...smartphone.sSeries,
    ...smartphone.flipSeries,
    ...smartphone.foldSeries,
    ...computer.tablet,
    ...computer.laptop,
    ...accessory.watch,
    ...accessory.buds,
    ...accessory.ring,
  ]);

  const { id } = useParams<{ id: string | undefined }>(); // useparams
  const detailProductId = id ? parseInt(id, 10) : null; // product id 가 true면 string 을 number(10진법) 으로 바꿈
  const productWithCurrentId = products.find(
    (products) => products.id === detailProductId
  ); // products의 id 가 현재 params 의 주소가 같은걸 뽑아줌.  products 를 뽑아줌.

  const checkCartItem = ({ id, image, title, price }: any) => {};

  const handleInputChange = (value: string) => {};

  const handleClick = () => {};

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto mb-32 max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <div>
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2"
              >
                {productWithCurrentId?.image?.map((img: string) => (
                  <SwiperSlide key={img}>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 pt-[100%]">
                      <div className="absolute inset-0 translate-x-1/2 translate-y-1/2">
                        <LazyLoadImage
                          src={img}
                          alt={productWithCurrentId.description}
                          className="absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={16}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="mySwiper mt-4"
              >
                {productWithCurrentId?.image?.map((img: string) => (
                  <SwiperSlide key={img}>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 pt-[100%]">
                      <div className="absolute inset-0 translate-x-1/2 translate-y-1/2">
                        <LazyLoadImage
                          src={img}
                          alt={productWithCurrentId.description}
                          className="absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product info */}
            <div className="mx-auto w-full pl-0 pt-10 pb-16 lg:pl-8 lg:pt-0 lg:pb-24">
              {/* Title */}
              <div className=" lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {productWithCurrentId?.title}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="mt-4 text-3xl tracking-tight text-gray-900">
                  ${productWithCurrentId?.referencePrice}
                </p>

                <div className={"mt-10"}>
                  {/*colors*/}
                  <div className={"mt-10"}>
                    <div className={"flex items-center justify-between"}>
                      <h3 className={"text-sm font-medium text-gray-900"}>
                        Color
                      </h3>
                    </div>
                  </div>
                </div>

                <RadioGroup
                  // value={selectedColor}
                  onChange={(value: string) => handleInputChange(value)}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color{" "}
                  </RadioGroup.Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {productWithCurrentId?.colors?.map((color: string) => (
                      <RadioGroup.Option
                        key={color}
                        value={color}
                        disabled={!color}
                        className={({ active }) =>
                          classNames(
                            color
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            active ? "ring-2 ring-violet-500" : "",
                            "group relative flex max-h-[44px] items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 "
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {color}
                            </RadioGroup.Label>
                            {color ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-violet-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                <Button
                  text="Add to bag"
                  // onClick={() => {
                  //     const id = productData?.id;
                  //     const image = productData?.image[0];
                  //     const title = productData?.title;
                  //     const price = productData?.price;
                  //     return checkCartItem({
                  //         id,
                  //         image,
                  //         title,
                  //         price,
                  //     });
                  // }}
                  className="mt-10 flex max-h-[44px] w-full items-center justify-center rounded-md border border-transparent bg-violet-500 py-2 px-8 text-base font-medium leading-7 text-white hover:bg-violet-600"
                />
              </div>
              <div className={"py-10 lg:border-gray-200 lg:pt-6 lg:pb-16"}>
                {/*discriptions detail*/}
                <div>
                  <h3 className={"sr-only"}>Description</h3>

                  <div className={"space-y-6"}>
                    <p className={"text-base text-gray-900"}>
                      {productWithCurrentId?.description}
                    </p>
                  </div>
                </div>

                <div className={"mt-10"}>
                  <h3 className={"text-sm font-medium text-gray-900"}>
                    Highlights
                  </h3>
                </div>

                <div className={"mt-4"}>
                  <ul
                    className={"list-disc space-y-2 pl-4 text-sm"}
                    role={"list"}
                  >
                    {productWithCurrentId?.highlights?.map((data) => (
                      <li key={data} className={"text-gray-400"}>
                        <span className={"text-gray-600"}>{data}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={"mt-10"}>
                  <h2 className={"text-sm font-medium text-gray-900"}>
                    Details
                  </h2>

                  <div className={"mt-4 space-y-6"}>
                    <p className={"text-sm text-gray-600"}>
                      {productWithCurrentId?.details}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
