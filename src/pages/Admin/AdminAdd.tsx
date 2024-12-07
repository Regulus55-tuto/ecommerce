import {Icon} from "@iconify/react";
import ProductTitle from "components/ui/ProductTitle";
import {accessory, computer, smartphone} from "data/Products/collectionsData";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import FileUploadWithDragAndDrop from "../../components/ui/FileUploadWithDragAndDrop";

interface CategoryType {
    name: string;
    id: number | string;
}

interface UploadedFile {
    name: string;
    size: number;
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
    id?: string;
    image?: string[];
    tags?: string[];
    colors?: string[];
    highlights?: string[];
    colorbuttons?: string[];
    inventory?: number;
}

const AdminAdd = () => {
    const params = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: {isSubmitting, errors, isDirty},
    } = useForm();


    // Category
    const getCategoryData = async () => {
        const {data} = await axios.get('http://localhost:8000/api/category')
        setCategoryInfo(data.body)
    }
    const [categoryInfo, setCategoryInfo] = useState<CategoryType[]>([])
    const categorySample: { [key: string]: string[] } = {
        smartphone: ["A series", "S series", "Flip series", "Fold series"],
        computer: ["Tab series", "Book series"],
        accessory: ["Watch series", "Buds series", "Ring series"],
    };
    // const [selectedCategoryName, setSelectedCategoryName] = useState(productData?.category?.name);
    // const [selectedCategoryId, setSelectedCategoryId] = useState("fca15230-e867-4a9a-a17f-557c5f5e33d2");
    // const options = selectedCategoryName ? Object.keys(categorySample[selectedCategoryName]) : [];
    // const handleCategoryChange = (e: any) => {
    //   // setSelectedCategoryName(e.target.value);

    // 선택된 category 의 id 찾기
    //   const selectedCategoryInfo = categoryInfo.find(
    //       (category) => category.name === e.target.value
    //   );
    //   if (selectedCategoryInfo) {
    //     setSelectedCategoryId("dd");
    //   }
    // };


    // 이미지
    const [imagePreviews, setImagePreviews] = useState<string[]>(['/images/default_image.webp']);
    const watchFiles = watch('productImgs');
    useEffect(() => {
        if (watchFiles && watchFiles.length > 0) {
            // 이미지파일 변경되면 화면에 표시
            const previews = Array.from(watchFiles).map(file => URL.createObjectURL(file as File));
            setImagePreviews(previews);

            return () => {
                previews.forEach(preview => URL.revokeObjectURL(preview));
            };
        }
    }, [watchFiles]);

    // input
    const {fields: colorFields, append: appendColor, remove: removeColor} = useFieldArray({
        control,
        name: "colors",
    });
    const handleAddColor = () => {
        appendColor("");
    };
    const handleRemoveColor = (index: number) => {
        removeColor(index); // 인덱스에 해당하는 필드 제거
    };

    // const {fields: colorbuttonFields, append: appendColorbutton} =
    //     useFieldArray({
    //         control,
    //         name: "colorbuttons",
    //     });
    const {fields: tagFields, append: appendTag, remove: removeTag} = useFieldArray({
        control,
        name: "tags",
    });
    const handleAddTag = () => {
        appendTag("");
    };
    const handleRemoveTag = (index: number) => {
        removeTag(index); // 인덱스에 해당하는 필드 제거
    };

    const {fields: highlightFields, append: appendHighlight, remove: removeHighlight} = useFieldArray({
        control,
        name: "highlights",
    });
    const handleAddHighlight = () => {
        appendHighlight("");
    };
    const handleRemoveHighlight = (index: number) => {
        removeHighlight(index); // 인덱스에 해당하는 필드 제거
    };

    // categories, subcategories
    const categories: { [key: string]: string[] } = {
        smartphone: ["A series", "S series", "Flip series", "Fold series"],
        computer: ["Tab series", "Book series"],
        accessory: ["Watch series", "Buds series", "Ring series"],
    };
    const [selectedCategory, setSelectedCategory] = useState(
        'smartphone'
    );
    const [selectedSubCategory, setSelectedSubCategory] = useState(
        'A series'
    );

    const handleCategoryChange = (e: any) => {
        setSelectedCategory(e.target.value);
    };
    const handleSubCategoryChange = (e: any) => {
        setSelectedSubCategory(e.target.value);
    };


    // 모달
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const example = () =>{
    //     console.log('모달확ㅇ;ㄴ')
    // }
// console.log('vmfh',categoryInfo)

    ///////////////////////////
    // 이미지 드래그 앤 드롭
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    // 자식 컴포넌트에서 파일 데이터를 받는 함수
    const handleFileUpload = (files: File[]) => {
        setUploadedFiles(files);
        console.log("Files received from child:", files);
    };
    // 제출
    const submit = async (data: any) => {

        const userInput = {
            name: data.name,
            description: data.description,
            price: parseInt(data.price),
            tags: data.tags,
            options: 'options',
            details: 'details',
            colors: data.colors,
            stock: 1,
            highlights: data.highlights,
            // productImgs: uploadedFiles,
            category: data.category ? JSON.parse(data.category) : categoryInfo[0],
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
            const url = `http://localhost:8000/api/product`
            const result = await axios.post(url, userInput, config);
            if (result.status === 201) {
                alert('Product added successfully')
                navigate('/product/new')
                console.log('result', result)
            }
            console.log('userInput', userInput)

        } catch (e) {
            console.log(e)
        }

    };


    // 데이터 가져오고 넣기
    useEffect(() => {
        // getItemData()
        getCategoryData()
    }, [categoryInfo])

    return (
        <div className={"bg-white"}>
            <form
                onSubmit={handleSubmit(submit)}
                className={"mx-auto mb-32 max-w-5xl px-4 sm:px-6 lg:px-8"}
            >
                {/* Title, Breadcrumbs, Sort */}
                <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
                    <div className="flex flex-col">
                        <ProductTitle title={"Add Product"}/>
                    </div>
                </div>

                {/* 아래내용 */}
                <div className="flex flex-col items-center justify-center px-40 mt-10">
                    <div className="grid grid-cols-10 w-full">
                        <div className="col-span-4 flex flex-col items-center">
                            <div className="flex flex-col items-center justify-end text-gray-500 mt-2">
                                <FileUploadWithDragAndDrop onFileUpload={handleFileUpload}/>
                            </div>
                        </div>

                        <div className="col-span-6 flex flex-col justify-evenly">
                            <div className="flex w-full px-5">
                                <h3 className="w-60 font-bold text-2xl text-gray-700">Name</h3>
                                <div className="w-full">
                                    <input
                                        className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                        {...register("name")}
                                        placeholder="Name"
                                    />
                                </div>
                            </div>

                            {/*<div className="flex w-full px-5">*/}
                            {/*    <h3 className="w-60 font-bold text-2xl text-gray-700">Model</h3>*/}
                            {/*    <div className="w-full">*/}
                            {/*        <input*/}
                            {/*            className="h-12 w-full border-2 border-gray-300 rounded-lg"*/}
                            {/*            {...register("model")}*/}
                            {/*            // placeholder={productData?.model}*/}
                            {/*            placeholder='Model'*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*<div className="flex w-full px-5">*/}
                            {/*    <h3 className="w-60 font-bold text-2xl text-gray-700">ID</h3>*/}
                            {/*    <div className="w-full">*/}
                            {/*        <textarea*/}
                            {/*            className="h-14 w-full border-2 border-gray-300 rounded-lg"*/}
                            {/*            {...register("id")}*/}
                            {/*            placeholder='ID'*/}
                            {/*            disabled*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}

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

                    {/*<div className="flex w-full p-3">*/}
                    {/*    <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">*/}
                    {/*        Reference Price*/}
                    {/*    </h3>*/}
                    {/*    <div className="w-full">*/}
                    {/*        <input*/}
                    {/*            className="h-12 w-full border-2 border-gray-300 rounded-lg"*/}
                    {/*            {...register("referencePrice")}*/}
                    {/*            // placeholder={`₩ ${productInfo?.referencePrice*/}
                    {/*            //   .toLocaleString()*/}
                    {/*            //   .toString()}`}*/}
                    {/*            placeholder={'Reference Price'}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="flex w-full p-3">
                        <h3 className="w-60 mr-10 font-bold text-2xl text-gray-700">
                            {/*Promotional */}
                            Price
                        </h3>
                        <div className="w-full">
                            <input
                                className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                {...register("price")}
                                placeholder='Price'
                            />
                        </div>
                    </div>

                    <div className="flex w-full p-3 my-2">
                        <h3 className="w-60 mr-10 font-bold text-2xl text-gray-700">
                            Description
                        </h3>
                        <div className="w-full">
              <textarea
                  {...register("description")}
                  className="h-32 w-full border-2 border-gray-300 rounded-lg"
                  placeholder='Description'
              />
                        </div>
                    </div>

                    <div className="flex w-full p-3 my-2">
                        <h3 className="w-60 mr-10 font-bold text-2xl text-gray-700">
                            Category
                        </h3>
                        <div className="w-full">
                            <select
                                {...register("category")}
                                className="h-12 w-full border-2 border-gray-300 rounded-lg"
                                // onChange={handleCategoryChange}
                            >
                                {categoryInfo?.map((category) => (
                                    <option key={category.id}
                                            value={JSON.stringify({id: category.id, name: category.name})}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/*<div className="flex w-full p-3">*/}
                    {/*    <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">*/}
                    {/*        SubCategory*/}
                    {/*    </h3>*/}
                    {/*    <div className="w-full">*/}
                    {/*        <select*/}
                    {/*            {...register("subCategory")}*/}
                    {/*            className="h-12 w-full border-2 border-gray-300 rounded-lg"*/}
                    {/*            // onChange={handleSubCategoryChange}*/}
                    {/*        >*/}
                    {/*            /!*{options.map((option: any) => (*!/*/}
                    {/*            /!*  <option key={option} defaultValue={option}>*!/*/}
                    {/*            /!*    {categories[selectedCategory][option]}*!/*/}
                    {/*            /!*  </option>*!/*/}
                    {/*            /!*))}*!/*/}
                    {/*        </select>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="flex w-full p-3 my-2">
                        <h3 className="w-60 mr-10 font-bold text-2xl text-gray-700">
                            Colors
                        </h3>
                        <div className="w-full">
                            {colorFields.length === 0 && (
                                <input
                                    {...register(`colors.0`)}
                                    className="h-20 w-full border-2 border-gray-300 rounded-lg my-1"
                                    placeholder="Color 1"
                                />
                            )}
                            {colorFields.map((field, index) => (
                                <div className={'flex items-center justify-center my-1'} key={index}>
                                    <input
                                        {...register(`colors.${index}`)}
                                        className="h-20 w-3/4 border-2 border-gray-300 rounded-lg"
                                        placeholder={`Color ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveColor(index)}
                                        className="bg-gray-500 text-white p-2 w-1/4 ml-2 rounded-lg mt-2 h-10"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddColor}
                                className="bg-gray-500 text-white p-2 rounded-lg mt-2 w-full"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/*<div className="flex w-full p-3">*/}
                    {/*    <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">*/}
                    {/*        Color Buttons*/}
                    {/*    </h3>*/}
                    {/*    <div className="w-full">*/}
                    {/*        /!*{colorbuttonFields.map((field, index) => (*!/*/}
                    {/*        /!*    <input*!/*/}
                    {/*        /!*        key={field.id}*!/*/}
                    {/*        /!*        {...register(`colorbuttons.${index}`)}*!/*/}
                    {/*        /!*        className="h-12 w-full border-2 border-gray-300 rounded-lg"*!/*/}
                    {/*        /!*        placeholder={productInfo?.colorbuttons?.[index]}*!/*/}
                    {/*        /!*    />*!/*/}
                    {/*        /!*))}*!/*/}
                    {/*    </div>*/}
                    {/*</div>*/}


                    <div className="flex w-full p-3 my-2">
                        <h3 className="w-60 mr-10 font-bold text-2xl text-gray-700">
                            Highlights
                        </h3>
                        <div className="w-full">
                            {highlightFields.length === 0 && (
                                <textarea
                                    {...register(`highlights.0`)}
                                    className="h-20 w-full border-2 border-gray-300 rounded-lg my-1"
                                    placeholder="Highlight 1"
                                />
                            )}
                            {highlightFields.map((field, index) => (
                                <div className={'flex items-center justify-center my-1'} key={index}>
                                    <textarea
                                        {...register(`highlights.${index}`)}
                                        className="h-20 w-3/4 border-2 border-gray-300 rounded-lg"
                                        placeholder={`Highlight ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveHighlight(index)}
                                        className="bg-gray-500 text-white p-2 w-1/4 ml-2 rounded-lg mt-2 h-10"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddHighlight}
                                className="bg-gray-500 text-white p-2 rounded-lg mt-2 w-full"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="flex w-full p-3 my-2">
                        <h3 className="w-60 mr-10 font-bold text-2xl text-gray-700">
                            Tags
                        </h3>
                        <div className="w-full">
                            {tagFields.length === 0 && (
                                <input
                                    {...register(`tags.0`)}
                                    className="h-20 w-full border-2 border-gray-300 rounded-lg my-1"
                                    placeholder="Tag 1"
                                />
                            )}
                            {tagFields.map((field, index) => (
                                <div className={'flex items-center justify-center my-1'} key={index}>
                                    <input
                                        {...register(`tags.${index}`)}
                                        className="h-20 w-3/4 border-2 border-gray-300 rounded-lg"
                                        placeholder='Tags'
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(index)}
                                        className="bg-gray-500 text-white p-2 w-1/4 ml-2 rounded-lg mt-2 h-10"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="bg-gray-500 text-white p-2 rounded-lg mt-2 w-full"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <button
                        type={'submit'}
                        className="bg-gray-300 border-gray-500 rounded-lg text-2xl p-4 mt-6 hover:cursor-pointer"
                    >
                        Add Product
                    </button>
                    {/*{isModalOpen && (*/}
                    {/*    <EditModal*/}
                    {/*        onClose={() => setIsModalOpen(false)}*/}
                    {/*        onConfirm={example}*/}
                    {/*    />*/}
                    {/*)}*/}
                </div>
            </form>
        </div>
    );
};

export default AdminAdd;