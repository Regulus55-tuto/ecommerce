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
            // colors: ['black', 'white', 'violet'],
            description: 'The latest flip-serires',
            options: 'flip',
            id: 1,
            image: 'data:image/webp;base64,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',
            details: 'New Flip Smartphone',
        },
        {
            title: 'Galaxy Fold6',
            price: 2400000,
            category: 'smartphone',
            tags: 'fold-series',
            // colors: ['black', 'white', 'red'],
            description: 'The latest fold-serires',
            options: 'fold',
            id: 1,
            image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQTzPHbe9xsqJcVsojt5VKj2PlTtl5ju3AjpnClrS-eIqnbogKD6rlp7MfM4Pgb8RYdrVR1Pf8MTnluTIpjZmMuC1fX6fV2rSWIUIQJ4YCfpJV_3cd50T6i8z6Mf3K2V6p8v1tGKw&usqp=CAc',
            details: 'New Flip Smartphone',
        },
        {
            title: 'Galaxy Flip6',
            price: 1300000,
            category: 'smartphone',
            tags: 'flip-series',
            // colors: ['black', 'white', 'violet'],
            description: 'The latest flip-serires',
            options: 'flip',
            id: 1,
            image: 'data:image/webp;base64,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',
            details: 'New Flip Smartphone',
        },
        {
            title: 'Galaxy Fold6',
            price: 2400000,
            category: 'smartphone',
            tags: 'fold-series',
            // colors: ['black', 'white', 'red'],
            description: 'The latest fold-serires',
            options: 'fold',
            id: 1,
            image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQTzPHbe9xsqJcVsojt5VKj2PlTtl5ju3AjpnClrS-eIqnbogKD6rlp7MfM4Pgb8RYdrVR1Pf8MTnluTIpjZmMuC1fX6fV2rSWIUIQJ4YCfpJV_3cd50T6i8z6Mf3K2V6p8v1tGKw&usqp=CAc',
            details: 'New Flip Smartphone',
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
                                                // colors={product.colors}
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