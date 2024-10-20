import React, {useState} from 'react';
import ProductTitle from "../components/ui/ProductTitle";
import {Menu} from "@headlessui/react";
import {ChevronDownIcon, FunnelIcon} from "@heroicons/react/16/solid";
import CategorySort from "../components/Product/CategorySort";
import useSortParams from "../hooks/useSortParams";
import FilterDesktop from "../components/Product/FilterDesktop";
import {COLLECTION, FILTERS} from "../data/Products";
import {ProductType} from "../utiles/interfaces";
import ProductCard3 from "../components/ui/ProductCard3";


const Collections = () => {
    const {query, searchParams, setSortParams, deleteSortParams} = useSortParams()

    // Get Filter Options
    const [colors, setColors] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([])
    const [products, setProducts] = useState<ProductType[]>([
        {
            title: 'Galaxy Flip6',
            price: 1300000,
            category: 'smartphone',
            tags: 'flip-series',
            colors: ["black","white","violet"],
            description: 'The latest flip-serires',
            options: 'flip',
            id: 1,
            image: ['https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQTzPHbe9xsqJcVsojt5VKj2PlTtl5ju3AjpnClrS-eIqnbogKD6rlp7MfM4Pgb8RYdrVR1Pf8MTnluTIpjZmMuC1fX6fV2rSWIUIQJ4YCfpJV_3cd50T6i8z6Mf3K2V6p8v1tGKw&usqp=CAc'],
            details: 'New Flip Smartphone',
            highlights: [
                "Galaxy Ai","5천만 화소","콤팩트한 사이즈","나만의 유니크 스타일"
            ]
        },
        {
            title: 'Galaxy Fold6',
            price: 2400000,
            category: 'smartphone',
            tags: 'fold-series',
            colors: ["black","white","violet"],
            description: 'The latest fold-serires',
            options: 'fold',
            id: 1,
            image: ['https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQTzPHbe9xsqJcVsojt5VKj2PlTtl5ju3AjpnClrS-eIqnbogKD6rlp7MfM4Pgb8RYdrVR1Pf8MTnluTIpjZmMuC1fX6fV2rSWIUIQJ4YCfpJV_3cd50T6i8z6Mf3K2V6p8v1tGKw&usqp=CAc'],
            details: 'New Flip Smartphone',
            highlights: [
                "Galaxy Ai","5천만 화소","콤팩트한 사이즈","나만의 유니크 스타일"
            ]
        },
        {
            title: 'Galaxy Flip6',
            price: 1300000,
            category: 'smartphone',
            tags: 'flip-series',
            colors: ["black","white","violet"],
            description: 'The latest flip-serires',
            options: 'flip',
            id: 1,
            image: ['https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQTzPHbe9xsqJcVsojt5VKj2PlTtl5ju3AjpnClrS-eIqnbogKD6rlp7MfM4Pgb8RYdrVR1Pf8MTnluTIpjZmMuC1fX6fV2rSWIUIQJ4YCfpJV_3cd50T6i8z6Mf3K2V6p8v1tGKw&usqp=CAc'],
            details: 'New Flip Smartphone',
            highlights: [
                "Galaxy Ai","5천만 화소","콤팩트한 사이즈","나만의 유니크 스타일"
            ]
        },
        {
            title: 'Galaxy Fold6',
            price: 2400000,
            category: 'smartphone',
            tags: 'fold-series',
            colors: ["black","white","violet"],
            description: 'The latest fold-serires',
            options: 'fold',
            id: 1,
            image: ['https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQTzPHbe9xsqJcVsojt5VKj2PlTtl5ju3AjpnClrS-eIqnbogKD6rlp7MfM4Pgb8RYdrVR1Pf8MTnluTIpjZmMuC1fX6fV2rSWIUIQJ4YCfpJV_3cd50T6i8z6Mf3K2V6p8v1tGKw&usqp=CAc'],
            details: 'New Flip Smartphone',
            highlights: [
                "Galaxy Ai","5천만 화소","콤팩트한 사이즈","나만의 유니크 스타일"
            ]
        }
    ])

    return (
        <div className={'bg-white'}>


            <main className={'mx-auto mb-32 max-w-7xl px-4 sm:px-6 lg:px-8'}>
                {/* Title, Breadcrumbs, Sort */}
                <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
                    <div className="flex flex-col">
                        {/* page title */}
                        <ProductTitle title={"Shop All"}/>
                    </div>
                    <div className={'flex items-center'}>
                        <Menu as={"div"} className={'relative inline-block text-left'}>
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
                                sortParams={searchParams.get('sort')}
                                ascParams={searchParams.get('asc')}
                            />
                        </Menu>

                        <button
                            className={'-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'}
                        >
                            <span className={'sr-only'}>Filters</span>
                            <FunnelIcon className={"h-5 w-5"} aria-hidden="true"/>
                        </button>
                    </div>
                </div>

                {/*{filter}*/}
                <section aria-labelledby={'products-heading'} className={'pt-6 pb-24'}>
                    <h2 id={'products-heading'} className={'sr-only'}>
                        Products
                    </h2>
                    <div className={'grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'}>

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

                        <div className={'lg:col-span-3'}>
                            <ul className={'grid grid-cols-1 gap-6 md:grid-cols-2'}>
                                <>
                                    {}
                                </>
                            </ul>

                            <ul className={'grid grid-cols-1 gap-6 md:grid-cols-2'}>
                                <>
                                    {products?.map((product)=>(
                                        <li
                                            key={product.id}
                                            className={'group cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out hover:shadow-md'}
                                        >
                                            <ProductCard3
                                                image={product.image}
                                                title={product.title}
                                                id={product.id}
                                                price={product.price}
                                                category={product.category}
                                                tags={product.tags}
                                                colors={product.colors}
                                                description={product.description}
                                                options={product.options}
                                                details={product.details}

                                            />
                                        </li>
                                    ))}
                                </>
                            </ul>
                        </div>


                    </div>
                </section>
            </main>
        </div>
    );
};

export default Collections;