import {Icon} from "@iconify/react";
import ProductTitle from "components/ui/ProductTitle";
import {accessory, computer, smartphone} from "data/Products/collectionsData";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {ProductType} from "utiles/interfaces";

interface AdminProps {
    title?: string;
    referencePrice?: number;
    promotionalPrice?: number;
    category?: string;
    id?: number;
    image?: string[];
    tags?: string[];
    colors?: string[];
    inventory?: number;
}

const AdminEdit = ({
                       title,
                       referencePrice,
                       promotionalPrice,
                       category,
                       id,
                       image,
                       colors,
                       tags,
                       inventory,
                   }: AdminProps) => {
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
    const params = useParams();
    const productInfo: ProductType | undefined = products.find(
        (product: any) => product.id === Number(params.id)
    );
    console.log("productId", productInfo);

    const adminTitle = ["title", "model", "id", "inventory"];
    const admininput = ["referencePrice", "promotionalPrice"];
    const [photoImg, setPhotoImg] = useState<string>("");
    const {
        register,
        handleSubmit,
        watch,
        formState: {isSubmitting, errors, isDirty},
    } = useForm();
    const watchImage = watch("image");

    const submit = (data: any) => {
        console.log('data',data)
    }

    useEffect(() => {
        if (productInfo) {
            //ProductInfo 가 있으면 (아이템의 세부정보가있으면)
            setPhotoImg(productInfo.image[0]); // 사진이미지에 아이템 사진을 넣음
        } else {
            setPhotoImg("/images/default_image.webp"); // 없으면 암것도없음
        }
        if (watchImage && watchImage.length > 0) {
            // 유저가 이미지 넣은거 있으면
            setPhotoImg(URL.createObjectURL(watchImage[0])); // 유저의 이미지를 사진에 넣는다
        }

        window.scrollTo(0,0)
    }, [watchImage]);

    return (
        <div className={"bg-white"}>
            <form onSubmit={handleSubmit(submit)} className={"mx-auto mb-32 max-w-7xl px-4 sm:px-6 lg:px-8"}>
                {/* Title, Breadcrumbs, Sort */}
                <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
                    <div className="flex flex-col">
                        <ProductTitle title={"Edit Product"}/>
                    </div>
                </div>

                {/* 아래내용 */}
                <div className="flex flex-col items-center justify-center px-40 mt-10">
                    <div className="grid grid-cols-10 w-full">
                        <div className="col-span-4 flex flex-col items-center">
                            <img src={photoImg} className="h-60 w-60"/>
                            <div className="flex flex-col items-center justify-end text-gray-500 mt-2">
                                <input
                                    {...register("image")}
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                />
                                <div>JPG, JPEG, PNG, or WEBP</div>
                            </div>
                        </div>

                        <div className="col-span-6 flex flex-col justify-evenly">
                            {adminTitle.map((item, index) => (
                                <div className="flex w-full px-5" key={item}>
                                    <div className="w-60 font-bold text-2xl text-gray-700">
                                        {item}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                            {...register(`item`)}
                                            placeholder={
                                                productInfo
                                                    ? item === "title"
                                                        ? productInfo.title
                                                        : item === "model"
                                                            ? productInfo.model
                                                            : item === "id"
                                                                ? productInfo.id.toString()
                                                                : item === 'inventory'
                                                                    ? productInfo.inventory?.toString() || "item"
                                                                    : "item"
                                                    : "item"
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {admininput.map((input) => (
                        <div className="flex w-full p-3" key={input}>
                            <div className="w-80 mr-10 font-bold text-2xl text-gray-700">
                                {input}
                            </div>
                            <div className="w-full">

                                <input
                                    className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                    placeholder={
                                        productInfo
                                            ? input === 'referencePrice'
                                                ? `₩ ${productInfo.referencePrice.toLocaleString().toString()}`
                                                : input === 'promotionalPrice'
                                                    ? `₩ ${productInfo.promotionalPrice.toLocaleString().toString()}`
                                                    : 'input'
                                            : 'input'
                                    }
                                />
                            </div>
                        </div>
                    ))}
                        <button type={'submit'} className="bg-gray-300 border-gray-500 rounded-lg text-2xl p-4 mt-6">
                            Edit Product
                        </button>
                </div>
            </form>
        </div>
    );
};

export default AdminEdit;
