import React from 'react';
import ProductTitle from "../../components/ui/ProductTitle";
import {useForm} from "react-hook-form";

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
                    <div className={'col-span-3 bg-red-200 w-4/5 xl:w-full mx-auto xl:mx-0'}>
                        <div className="flex items-center justify-center">
                            <table className="table-auto w-full">
                                <tr className="text-center font-bold text-xl text-gray-700 border-y-4 border-gray-500">
                                    {/*제목부분 */}
                                    <td className="py-1">ㅁ</td>
                                    <td className="py-1">Images</td>
                                    <td className="py-1">Name</td>
                                    <td className="py-1">Quantity</td>
                                    <td className="py-1">Total Price</td>
                                    <td className="py-1">Delete</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div className={'col-span-1 bg-yellow-200 xl:ml-6 w-4/5 xl:w-5/6 mx-auto xl:mx-0'}>박스</div>
                </form>

            </main>
        </div>
    );
};

export default Carts;