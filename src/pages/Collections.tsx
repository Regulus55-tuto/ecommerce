import React, {useState} from 'react';
import ProductTitle from "../components/ui/ProductTitle";
import {Menu} from "@headlessui/react";
import {ChevronDownIcon, FunnelIcon} from "@heroicons/react/16/solid";
import CategorySort from "../components/Product/CategorySort";
import useSortParams from "../hooks/useSortParams";
import FilterDesktop from "../components/Product/FilterDesktop";
import {COLLECTION, FILTERS} from "../data/Products";

const Collections = () => {
    const {query, searchParams, setSortParams, deleteSortParams} = useSortParams()

    // Get Filter Options
    const [colors, setColors] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([])

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
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
};

export default Collections;