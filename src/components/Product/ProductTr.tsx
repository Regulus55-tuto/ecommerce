import React from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import DeleteModal from "../ui/DeleteModal";

const ProductTr = (item: any, i:number) => {
    return (
        <>
            <tr className="text-center" key={i}>
                <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                    {i + 1}
                </td>

                <td className="flex items-center justify-center border-b border-gray-500 text-lg text-gray-700 font-bold">
                    <div className="flex items-center justify-center h-40 w-96 -space-x-12">
                        {item?.productImgs?.map((img: any, i: number) => (
                            <span
                                className={`flex items-center justify-center bg-gray-100 w-32 h-32 rounded-full shadow-md border-8 border-white z-${i + 1}`}
                                key={i}>
                                            <LazyLoadImage
                                                src={img}
                                                className={"h-auto w-auto z-0"}
                                            />
                                                </span>
                        ))}

                    </div>
                </td>

                <td className="border-y border-gray-500 px-2 font-bold">
                    <p className={'text-lg text-gray-700'}>{item.name}</p>
                    <p className={'text-sm text-gray-400'}>{item.name}</p>
                </td>

                <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                    ₩ {Math.floor(item.price)?.toLocaleString()}
                </td>

                <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                    {item.stock === 0 ? (
                        <span className="bg-red-600 text-white rounded-full p-2 h-full w-20">Out of Stock</span>
                    ) : (
                        <span className="bg-green-500 text-white rounded-full p-2 w-20">On Sale</span>
                    )}
                </td>
                <td className="border-y border-gray-500 px-2 text-lg text-gray-700 font-bold">
                    <div className={'flex items-center justify-center '}>
                        {/*<Link*/}
                        {/*    to={`/product/edit/${item.id}`}*/}
                        {/*    state={{*/}
                        {/*        item.title,*/}
                        {/*        item.referencePrice,*/}
                        {/*        item.promotionalPrice,*/}
                        {/*        item.category,*/}
                        {/*        item.id,*/}
                        {/*        item.colors,*/}
                        {/*        item.image,*/}
                        {/*        item.tags,*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <Icon icon="fluent:edit-16-regular" width="36"/>*/}
                        {/*</Link>*/}
                    </div>
                </td>

                <td className="border-y border-gray-500 p-2 text-lg text-gray-700 font-bold">
                    <div className={'flex items-center justify-center'}>
                        {/*<Icon*/}
                        {/*    icon="fluent:delete-24-regular"*/}
                        {/*    className="cursor-pointer"*/}
                        {/*    width="36"*/}
                        {/*    onClick={() => openModal(item.id, item.name)}*/}
                        {/*/>*/}
                        {/*{isModalOpen && selectedItemId !== null && (*/}
                        {/*    <DeleteModal*/}
                        {/*        onClose={closeModal}*/}
                        {/*        onConfirm={() => handleDelete(selectedItemId, selectedItemName)}*/}
                        {/*        productId={selectedItemId}*/}
                        {/*        productName={selectedItemName}*/}
                        {/*    />*/}
                        {/*)}*/}
                        {/*쓰레기통*/}
                    </div>
                </td>
            </tr>
        </>
    );
};

export default ProductTr;