import React from 'react';
import ProductTitle from "../../components/ui/ProductTitle";
import {useForm} from "react-hook-form";
import Checkbox from "../../components/ui/Checkbox";

const Carts = () => {
    const {register, handleSubmit, formState, setError} = useForm()

    return (
        <div className={"bg-white"}>
            <main className={"mx-auto mb-2 max-w-7xl px-4 sm:px-6 lg:px-8"}>
                {/* Title, Breadcrumbs, Sort */}
                <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
                    <div className="flex flex-col">
                        {/* page title */}
                        <ProductTitle title={"Carts"}/>
                    </div>
                </div>

                {/*아래내용*/}
                <form className={'grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 w-full mt-10'}>
                    <div className={'col-span-3 bg-red-200 w-4/5 h-48 xl:w-full mx-auto xl:mx-0'}>
                        <div className="flex items-center justify-center">
                            <table className="table-auto w-full">
                                <tr className="text-center font-bold text-xl text-gray-700 border-y-4 border-gray-500 py-1">
                                    {/*제목부분 */}
                                    <td className="py-1">ㅁ</td>
                                    <td className="py-1">Images</td>
                                    <td className="py-1">Name</td>
                                    <td className="py-1">Quantity</td>
                                    <td className="py-1">Total Price</td>
                                    <td className="py-1">Delete</td>
                                </tr>


                                <tr className="text-center font-bold text-xl text-gray-700 py-1">
                                    {/*내용부분 */}
                                    <td className="border-y border-gray-500 px-2 font-bold">
                                        {/*<Checkbox*/}
                                        {/*    type="checkbox"*/}
                                        {/*    {...register(`consent.${item.key}` as keyof IProps, {*/}
                                        {/*        required: item.required*/}
                                        {/*            ? "This field is required."*/}
                                        {/*            : false,*/}
                                        {/*    })}*/}
                                        {/*    labelText={item.label}*/}
                                        {/*    id={item.key}*/}
                                        {/*    key={item.key}*/}
                                        {/*    className={"mb-1"}*/}
                                        {/*    onChange={(e) =>*/}
                                        {/*        handleSingleCheck(e.target.checked, item.id, item.key)*/}
                                        {/*    }*/}
                                        {/*    checked={checkItems.includes(item.id)}*/}
                                        {/*/>*/}
                                    </td>
                                    <td className="flex items-center justify-center border-b border-gray-500 text-lg text-gray-700 font-bold">
                                        <div className="flex items-center justify-center h-40 w-96 -space-x-12">
                                            ㅇㅇ
                                        </div>
                                    </td>
                                    <td className="border-y border-gray-500 px-2 font-bold">dd</td>
                                    <td className="border-y border-gray-500 px-2 font-bold">dd</td>
                                    <td className="border-y border-gray-500 px-2 font-bold">dd</td>
                                    <td className="border-y border-gray-500 px-2 font-bold">dd</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div
                        className={'col-span-1 text-center border border-gray-800 rounded-sm mt-12 xl:mt-0 xl:ml-6 w-4/5 h-80 px-4 py-2 xl:w-5/6 mx-auto xl:mx-0'}>
                        <div>
                            <div className={'text-gray-500 text-sm font-bold mt-2'}>
                                총 주문금액
                            </div>
                            <div className={'text-gray-800 text-xl font-bold my-2'}>
                                10000원
                            </div>
                        </div>

                        <div className={'border-t border-gray-800 mt-4'}>
                            <button
                                type={'submit'}
                                className={'bg-violet-400 text-white text-lg w-full font-medium rounded-lg px-4 py-1 mt-3'}
                            >
                                Purchase
                            </button>
                        </div>
                    </div>
                </form>

            </main>
        </div>
    );
};

export default Carts;