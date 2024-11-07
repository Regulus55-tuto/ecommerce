import React, {useEffect, useRef, useState} from "react";
import ProductTitle from "../components/ui/ProductTitle";
import {Menu} from "@headlessui/react";
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, FunnelIcon} from "@heroicons/react/16/solid";
import CategorySort from "../components/Product/CategorySort";
import useSortParams from "../hooks/useSortParams";
import FilterDesktop from "../components/Product/FilterDesktop";
import {COLLECTION, FILTERS} from "../data/Products";
import {ProductType} from "../utiles/interfaces";
import ProductCard3 from "../components/ui/ProductCard3";
import {accessory, computer, smartphone} from "data/Products/collectionsData";
import ProductCard31 from "../components/ui/ProductCard31";
import axios from "axios";
import PageDropdown from "../components/ui/PageDropdown";

interface pageProps {
    itemCount?: number;
    page: number;
    pageCount: number;
    take: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

const AllProducts = () => {
    const {query, searchParams, setSortParams, deleteSortParams} =
        useSortParams();

    // 페이지네이션
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [pageData, setPageData] = useState<pageProps>()
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(10);
    const openDropdown = () => setIsDropdownOpen(true);
    const closeDropdown = () => setIsDropdownOpen(false);
    const DropdownRef = useRef<HTMLDivElement>(null);

    const pageSelected = (item: number) => {
        setTake(item)
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (DropdownRef.current && !DropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
                window.location.reload()
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);


    // 프로덕트 데이타
    const [productData, setProductData] = useState<ProductType[]>([]);
    const getProductData = async () => {
        try {
            const url = `http://localhost:8000/api/product?order=ASC&page=${page}&take=${take}`
            const result = await axios.get(url)
            setProductData(result.data.body.data)
            setPageData(result.data.body.meta)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getProductData()
    }, [page, take])

    // Get Filter Options
    const [colors, setColors] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);


    return (
        <div className={"bg-white"}>
            <main className={"mx-auto mb-2 max-w-7xl px-4 sm:px-6 lg:px-8"}>
                {/* Title, Breadcrumbs, Sort */}
                <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
                    <div className="flex flex-col">
                        {/* page title */}
                        <ProductTitle title={"Shop All"}/>
                    </div>
                    <div className={"flex items-center"}>

                        <div className={'mr-8 font-medium'}>
                            Selected Items :{" "}
                            <button onClick={openDropdown}
                                    className="bg-violet-400 text-md font-medium text-white px-4 py-1 rounded-lg">
                                {take}
                            </button>

                            {isDropdownOpen && (
                                <div ref={DropdownRef}>
                                    <PageDropdown
                                        isOpen={isDropdownOpen}
                                        onClose={closeDropdown}
                                        onSelect={pageSelected}
                                    />
                                </div>
                            )}
                        </div>

                        <Menu as={"div"} className={"relative inline-block text-left"}>
                            <div>
                                <Menu.Button
                                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <ChevronDownIcon
                                        className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>

                            <CategorySort
                                setSortParams={setSortParams}
                                deleteSortParams={deleteSortParams}
                                sortParams={searchParams.get("sort")}
                                ascParams={searchParams.get("asc")}
                            />
                        </Menu>

                        <button
                            className={
                                "-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            }
                        >
                            <span className={"sr-only"}>Filters</span>
                            <FunnelIcon className={"h-5 w-5"} aria-hidden="true"/>
                        </button>
                    </div>
                </div>

                {/*{filter}*/}
                <section aria-labelledby={"products-heading"} className={"pt-6 pb-24"}>
                    <h2 id={"products-heading"} className={"sr-only"}>
                        Products
                    </h2>
                    <div className={"grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4"}>
                        {/*filterBox*/}
                        <FilterDesktop
                            allCategories={COLLECTION}
                            filters={FILTERS}
                            colors={colors}
                            sizes={sizes}
                            setSortParams={setSortParams}
                            deleteSortParams={deleteSortParams}
                            searchParams={searchParams}
                        />

                        <div className={"lg:col-span-3"}>
                            <ul className={"grid grid-cols-1 gap-6 md:grid-cols-2"}>
                                <>{}</>
                            </ul>

                            <ul
                                className={
                                    "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                                }
                            >
                                <>
                                    {productData?.map((product) => (
                                        <li
                                            key={product.id}
                                            className={
                                                "group border border-slate-100 cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out hover:shadow-md"
                                            }
                                        >
                                            <ProductCard31
                                                image={product.image}
                                                model={product.model}
                                                title={product.title}
                                                name={product.name}
                                                id={product.id}
                                                referencePrice={product.referencePrice}
                                                promotionalPrice={product.promotionalPrice}
                                                price={product.price}
                                                category={product.category}
                                                tags={product.tags}
                                                colors={product.colors}
                                                colorbuttons={product.colorbuttons}
                                                description={product.description}
                                                productImgs={product.productImgs}
                                            />
                                        </li>
                                    ))}
                                </>
                            </ul>
                        </div>
                    </div>
                    {/* 페이지네이션 */}
                    <div className={'flex items-center justify-center mt-20'}>
                        <ChevronLeftIcon
                            onClick={()=>{
                                window.scrollTo({ top: 0, left: 0 });
                                if(pageData?.hasPreviousPage) {
                                    setPage(page-1)
                                }
                            }}
                            className={`h-12 w-12  ${
                            pageData?.hasPreviousPage ? 'hover:cursor-pointer hover:scale-110' : 'opacity-50 pointer-events-none'
                        }`} aria-hidden="true"/>

                        {[...Array(pageData?.pageCount)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setPage(index + 1);
                                    window.scrollTo({ top: 0, left: 0 });
                                }}
                                className={`h-10 mx-1 px-4 py-2 bg-violet-300 text-md flex items-center justify-center rounded-lg ${
                                    page === index + 1 ? "cursor-default scale-125 mx-2 border-2 border-gray-600 pointer-events-none" : "hover:bg-violet-400"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <ChevronRightIcon
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0 });
                                if (pageData?.hasNextPage) {
                                    setPage(page + 1)
                                }
                            }}
                            className={`h-12 w-12  ${
                                pageData?.hasNextPage ? 'hover:cursor-pointer hover:scale-110' : 'opacity-50 pointer-events-none'
                            }`} aria-hidden="true"/>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AllProducts;
