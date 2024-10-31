import {Icon} from "@iconify/react";
import ProductTitle from "components/ui/ProductTitle";
import {accessory, computer, smartphone} from "data/Products/collectionsData";
import React, {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {ProductType} from "utiles/interfaces";
import axios from "axios";

interface CategoryType {
    name: string;
    id: number | string;
}

interface AdminProps {
    title?: string;
    name?: string;
    referencePrice?: number;
    promotionalPrice?: number;
    price?: number;
    description?: string;
    category?: CategoryType;
    subCategory?: string;
    id?: number;
    image?: string[];
    tags?: string[];
    colors?: string[];
    colorbuttons?: string[];
    inventory?: number;
}

const AdminEdit = () => {
    const params = useParams();

    const getItemData = async () => {
        try {
            const url = `http://localhost:8000/api/product/${params.id}`
            const {data} = await axios.get(url)
            console.log('result', data.body)
            setProductData(data.body)
        } catch (e) {
            console.log('eeeeee', e)
        }
    }
    const [productData, setProductData] = useState<AdminProps | null>(null)

    // Category
    const getCategoryData = async () => {
        const {data} = await axios.get('http://localhost:8000/api/category')
        console.log('catego', data.body)
        setCategoryInfo(data.body)
    }
    const [categoryInfo, setCategoryInfo] = useState<any[]>([])

    const categorySample: { [key: string]: string[] } = {
        smartphone: ["A series", "S series", "Flip series", "Fold series"],
        computer: ["Tab series", "Book series"],
        accessory: ["Watch series", "Buds series", "Ring series"],
    };
    const [selectedCategoryName, setSelectedCategoryName] = useState(productData?.category?.name);
    const [selectedCategoryId, setSelectedCategoryId] = useState("fca15230-e867-4a9a-a17f-557c5f5e33d2");
    const options = selectedCategoryName ? Object.keys(categorySample[selectedCategoryName]) : [];
    const handleCategoryChange = (e: any) => {
        setSelectedCategoryName(e.target.value);

        // 선택된 category 의 id 찾기
        const selectedCategoryInfo = categoryInfo.find(
            (category) => category.name === e.target.value
        );
        if (selectedCategoryInfo) {
            setSelectedCategoryId(selectedCategoryInfo.id);
        }
    };

    const [photoImg, setPhotoImg] = useState<string>("");
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: {isSubmitting, errors, isDirty},
    } = useForm();

    // input
    const watchImage = watch("image");
    const {fields: colorFields, append: appendColor} = useFieldArray({
        control,
        name: "colors",
    });
    const {fields: colorbuttonFields, append: appendColorbutton} =
        useFieldArray({
            control,
            name: "colorbuttons",
        });
    const {fields: tagFields, append: appendTag} = useFieldArray({
        control,
        name: "tags",
    });
    const {fields: highlightFields, append: appendHighlight} = useFieldArray({
        control,
        name: "highlights",
    });

    // categories, subcategories
    const categories: { [key: string]: string[] } = {
        smartphone: ["A series", "S series", "Flip series", "Fold series"],
        computer: ["Tab series", "Book series"],
        accessory: ["Watch series", "Buds series", "Ring series"],
    };
    // const [selectedCategory, setSelectedCategory] = useState(
    //   productInfo?.category || ""
    // );
    // const [selectedSubCategory, setSelectedSubCategory] = useState(
    //   productInfo?.subCategory || ""
    // );
    // const options = Object.keys(categories[selectedCategory]);
    // const options = categories[selectedCategory] ? Object.keys(categories[selectedCategory]) : [];
    //
    // const handleCategoryChange = (e: any) => {
    //   setSelectedCategory(e.target.value);
    // };
    // const handleSubCategoryChange = (e: any) => {
    //   setSelectedSubCategory(e.target.value);
    // };

    const submit = (data: any) => {
        console.log("data", data);
    };
    useEffect(() => {
        getItemData()
        getCategoryData()
    }, [])
    // useEffect(() => {
    //   if (productInfo) {
    //     //ProductInfo 가 있으면 (아이템의 세부정보가있으면)
    //     setPhotoImg(productInfo.image[0]); // 사진이미지에 아이템 사진을 넣음
    //   } else {
    //     setPhotoImg("/images/default_image.webp"); // 없으면 암것도없음
    //   }
    //   if (watchImage && watchImage.length > 0) {
    //     // 유저가 이미지 넣은거 있으면
    //     setPhotoImg(URL.createObjectURL(watchImage[0])); // 유저의 이미지를 사진에 넣는다
    //   }
    // }, [watchImage]);
    // useEffect(() => {
    //   if (productInfo) {
    //     setValue("title", productInfo.title);
    //     setValue("model", productInfo.model);
    //     setValue(
    //       "referencePrice",
    //       `₩ ${productInfo.referencePrice.toLocaleString()}`
    //     );
    //     setValue(
    //       "promotionalPrice",
    //       `₩ ${productInfo.promotionalPrice.toLocaleString()}`
    //     );
    //     setValue("category", productInfo.category);
    //     setValue("subCategory", productInfo.subCategory);
    //     setValue("description", productInfo.description);
    //     setValue("tags", productInfo.tags);
    //     setValue("colors", productInfo.colors);
    //     setValue("colorbuttons", productInfo.colorbuttons);
    //     setValue("id", productInfo.id);
    //     setValue("highlights", productInfo.highlights);
    //     setValue("inventory", productInfo.inventory);
    //   }
    //   if (productInfo?.subCategory) {
    //     setValue("subCategory", productInfo.subCategory);
    //   }
    //   window.scrollTo(0, 0);
    // }, []);

    if (!productData) {
        return <div>Loading..</div>
    }

    return (
        <div className={"bg-white"}>
            <form
                onSubmit={handleSubmit(submit)}
                className={"mx-auto mb-32 max-w-7xl px-4 sm:px-6 lg:px-8"}
            >
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
                            <div className="flex w-full px-5">
                                <h3 className="w-60 font-bold text-2xl text-gray-700">Name</h3>
                                <div className="w-full">
                                    <input
                                        className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                        {...register("name")}
                                        placeholder={productData?.name}
                                    />
                                </div>
                            </div>

                            <div className="flex w-full px-5">
                                <h3 className="w-60 font-bold text-2xl text-gray-700">Model</h3>
                                <div className="w-full">
                                    <input
                                        className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                        {...register("model")}
                                        // placeholder={productData?.model}
                                        placeholder={'Model'}
                                    />
                                </div>
                            </div>

                            <div className="flex w-full px-5">
                                <h3 className="w-60 font-bold text-2xl text-gray-700">ID</h3>
                                <div className="w-full">
                                    <textarea
                                        className="h-20 w-full border-2 border-gray-300 rounded-lg"
                                        {...register("id")}
                                        placeholder={String(productData?.id)}
                                    />
                                </div>
                            </div>

                            <div className="flex w-full px-5">
                                <h3 className="w-60 font-bold text-2xl text-gray-700">
                                    Inventory
                                </h3>
                                <div className="w-full">
                                    <input
                                        className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                        {...register("inventory")}
                                        // placeholder={productInfo?.inventory?.toString()}
                                        placeholder={'Inventory'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full p-3">
                        <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
                            Reference Price
                        </h3>
                        <div className="w-full">
                            <input
                                className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                {...register("referencePrice")}
                                // placeholder={`₩ ${productInfo?.referencePrice
                                //   .toLocaleString()
                                //   .toString()}`}
                                placeholder={'Reference Price'}
                            />
                        </div>
                    </div>

                    <div className="flex w-full p-3">
                        <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
                            Promotional Price
                        </h3>
                        <div className="w-full">
                            <input
                                className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                {...register("promotionalPrice")}
                                placeholder={`₩ ${String(productData?.price
                                    ?.toLocaleString())
                                }`}
                            />
                        </div>
                    </div>

                    <div className="flex w-full p-3">
                        <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
                            Description
                        </h3>
                        <div className="w-full">
              <textarea
                  {...register("description")}
                  className="h-32 w-full border-2 border-gray-300 rounded-lg"
                  placeholder={productData?.description}
              />
                        </div>
                    </div>

                    <div className="flex w-full p-3">
                        <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
                            Category
                        </h3>
                        <div className="w-full">
                            <select
                                {...register("category")}
                                className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                // onChange={handleCategoryChange}
                            >
                                {Object.keys(categories).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex w-full p-3">
                        <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
                            SubCategory
                        </h3>
                        <div className="w-full">
                            <select
                                {...register("subCategory")}
                                className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                // onChange={handleSubCategoryChange}
                            >
                                {/*{options.map((option: any) => (*/}
                                {/*  <option key={option} defaultValue={option}>*/}
                                {/*    {categories[selectedCategory][option]}*/}
                                {/*  </option>*/}
                                {/*))}*/}
                            </select>
                        </div>
                    </div>

                    <div className="flex w-full p-3">
                        <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
                            Colors
                        </h3>
                        <div className="w-full">
                            {colorFields.map((field, index) => (
                                <input
                                    key={field.id}
                                    {...register(`colors.${index}`)}
                                    className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                    // placeholder={productData?.colors?.[index]}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex w-full p-3">
                        <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
                            Color Buttons
                        </h3>
                        <div className="w-full">
                            {colorbuttonFields.map((field, index) => (
                                <input
                                    key={field.id}
                                    {...register(`colorbuttons.${index}`)}
                                    className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                    // placeholder={productInfo?.colorbuttons?.[index]}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex w-full p-3">
                        <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
                            Highlights
                        </h3>
                        <div className="w-full">
                            {highlightFields.map((field, index) => (
                                <input
                                    key={field.id}
                                    {...register(`highlights.${index}`)}
                                    className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                    // placeholder={productInfo?.highlights?.[index]}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex w-full p-3">
                        <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
                            Tags
                        </h3>
                        <div className="w-full">
                            {tagFields.map((field, index) => (
                                <input
                                    key={field.id}
                                    {...register(`tags.${index}`)}
                                    className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                    // placeholder={productInfo?.tags?.[index]}
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        type={"submit"}
                        className="bg-gray-300 border-gray-500 rounded-lg text-2xl p-4 mt-6"
                    >
                        Edit Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminEdit;
