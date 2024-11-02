

// import { Icon } from "@iconify/react";
// import ProductTitle from "components/ui/ProductTitle";
// import React, { useEffect, useState } from "react";
// import { useFieldArray, useForm } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
//
// interface AdminProps {
//   title?: string;
//   referencePrice?: number;
//   promotionalPrice?: number;
//   category?: string;
//   id?: number;
//   productImgs?: any;
//   //   image?: (string | Blob | File)[];
//   tags?: string;
//   colors?: string[];
// }
//
// const AdminAdd = ({
//   title,
//   referencePrice,
//   promotionalPrice,
//   category,
//   id,
//   productImgs,
//   colors,
//   tags,
// }: AdminProps) => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//     formState: { isSubmitting, errors, isDirty },
//   } = useForm();
//   const navigate = useNavigate();
//   const token: any = localStorage.getItem("token");
//
//   const categorySample: { [key: string]: string[] } = {
//     smartphone: ["A series", "S series", "Flip series", "Fold series"],
//     computer: ["Tab series", "Book series"],
//     accessory: ["Watch series", "Buds series", "Ring series"],
//   };
//   const [selectedCategoryName, setSelectedCategoryName] =
//     useState("smartphone"); // 기본 카테고리는 스마트폰
//   const [selectedCategoryId, setSelectedCategoryId] = useState(
//     "fca15230-e867-4a9a-a17f-557c5f5e33d2" // 기본 id는 스마트폰의 id
//   );
//   const options = Object.keys(categorySample[selectedCategoryName]);
//   const handleCategoryChange = (e: any) => {
//     setSelectedCategoryName(e.target.value);
//
//     // 선택된 category 의 id 찾기
//     const selectedCategoryInfo = categoryInfo.find(
//       (category) => category.name === e.target.value
//     );
//     if (selectedCategoryInfo) {
//       setSelectedCategoryId(selectedCategoryInfo.id);
//     }
//   };
//
//   const { fields: colorFields, append: appendColor } = useFieldArray({
//     control,
//     name: "colors",
//   });
//   const handleAddColor = () => {
//     appendColor("");
//   };
//   const { fields: colorbuttonFields, append: appendColorbutton } =
//     useFieldArray({
//       control,
//       name: "colorbuttons",
//     });
//   const handleAddColorbutton = () => {
//     appendColorbutton("");
//   };
//
//   const { fields: highlightFields, append: appendHighlight } = useFieldArray({
//     control,
//     name: "highlights",
//   });
//   const handleAddHighlight = () => {
//     appendHighlight("");
//   };
//
//   const { fields: tagFields, append: appendTag } = useFieldArray({
//     control,
//     name: "tags",
//   });
//   const handleAddTag = () => {
//     appendTag("");
//   };
//
//   const getCategoryData = async () => {
//     const { data } = await axios.get("http://localhost:8000/api/category");
//     setCategoryInfo(data.body);
//   };
//   const [categoryInfo, setCategoryInfo] = useState<any[]>([]);
//
//   //   이미지
//   // const watchImage = watch("image");
//   // const [photoImg, setPhotoImg] = useState("/images/default_image.webp");
//   // useEffect(() => {
//   //   if (watchImage && watchImage.length > 0) {
//   //     // 유저가 이미지 넣은거 있으면
//   //     setPhotoImg(URL.createObjectURL(watchImage[0])); // 유저의 이미지를 사진에 넣는다
//   //   }
//   //   getCategoryData(); // 카테고리 정보 가져오는거
//   // }, [watchImage]);
//
//   // 이미지
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const watchFiles = watch('productImgs');
//   useEffect(() => {
//     if (watchFiles && watchFiles.length > 0) {
//       // 이미지파일 변경되면 화면에 표시
//       const previews = Array.from(watchFiles).map(file => URL.createObjectURL(file as File));
//       setImagePreviews(previews);
//
//       return () => {
//         previews.forEach(preview => URL.revokeObjectURL(preview));
//       };
//     }
//   }, [watchFiles]);
//
//   //    제출
//   const submit = async (data: any) => {
//     const productImgsArray = Array.from(data.productImgs || [])
//
//     try {
//       const userInput = {
//         name: data.title,
//         description: data.description,
//         price: data.promotionalPrice,
//         options: "option",
//         details: "detail",
//         colors: data.colors,
//         tags: data.tags,
//         highlights: data.highlights,
//         productImgs: productImgsArray,
//         category: {
//           name: selectedCategoryName,
//           id: selectedCategoryId,
//         },
//       };
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const result = await axios.post('http://localhost:8000/api/product',userInput,config)
//       console.log("result", userInput);
//       alert("데이터 추가 성공");
//       // navigate('/product/new')
//     } catch (e) {
//       console.log("submit errorrr", e);
//     }
//   };
//
//   useEffect(()=>{
//     getCategoryData(); // 카테고리 정보 가져오는거
//   },[categoryInfo])
//
//   return (
//     <div className={"bg-white"}>
//       <form
//         onSubmit={handleSubmit(submit)}
//         className={"mx-auto mb-32 max-w-7xl px-4 sm:px-6 lg:px-8"}
//       >
//         {/* Title, Breadcrumbs, Sort */}
//         <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
//           <div className="flex flex-col">
//             <ProductTitle title={"Add Product"} />
//           </div>
//         </div>
//
//         {/* 아래내용 */}
//         <div className="flex flex-col items-center justify-center px-40 mt-10">
//           <div className="grid grid-cols-10 w-full">
//             <div className="col-span-4 flex flex-col items-center">
//               {/*<img src={photoImg} className="h-60 w-60" />*/}
//               {imagePreviews.map((preview, index) => (
//                   <img
//                       key={index}
//                       src={preview}
//                       alt={`Preview ${index + 1}`}
//                       className="h-60 w-60 object-cover"
//                   />
//               ))}
//               <div className="flex flex-col items-center justify-end text-gray-500 mt-2">
//                 <input
//                   {...register("productImgs")}
//                   type="file"
//                   accept="image/png,image/jpeg,image/jpg,image/webp"
//                   multiple
//                 />
//                 <div>JPG, JPEG, PNG, or WEBP</div>
//               </div>
//             </div>
//
//             <div className="col-span-6 flex flex-col justify-evenly">
//               <div className="flex w-full px-5">
//                 <h3 className="w-60 font-bold text-2xl text-gray-700">Title</h3>
//                 <div className="w-full">
//                   <input
//                     className="h-12 w-full border-2 border-gray-300 rounded-lg"
//                     {...register("title")}
//                     placeholder="title"
//                   />
//                 </div>
//               </div>
//
//               <div className="flex w-full px-5">
//                 <h3 className="w-60 font-bold text-2xl text-gray-700">Model</h3>
//                 <div className="w-full">
//                   <input
//                     className="h-12 w-full border-2 border-gray-300 rounded-lg"
//                     {...register("model")}
//                     placeholder="model"
//                   />
//                 </div>
//               </div>
//
//               {/*<div className="flex w-full px-5">*/}
//               {/*    <h3 className="w-60 font-bold text-2xl text-gray-700">ID</h3>*/}
//               {/*    <div className="w-full">*/}
//               {/*        <input*/}
//               {/*            className="h-12 w-full border-2 border-gray-300 rounded-lg"*/}
//               {/*            {...register("id")}*/}
//               {/*            placeholder="id"*/}
//               {/*        />*/}
//               {/*    </div>*/}
//               {/*</div>*/}
//
//               <div className="flex w-full px-5">
//                 <h3 className="w-60 font-bold text-2xl text-gray-700">
//                   Inventory
//                 </h3>
//                 <div className="w-full">
//                   <input
//                     className="h-12 w-full border-2 border-gray-300 rounded-lg"
//                     {...register("inventory")}
//                     placeholder="inventory"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//
//           <div className="flex w-full p-3">
//             <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
//               Reference Price
//             </h3>
//             <div className="w-full">
//               <input
//                 className="h-12 w-full border-2 border-gray-300 rounded-lg"
//                 {...register("referencePrice")}
//                 placeholder="reference Price"
//               />
//             </div>
//           </div>
//
//           <div className="flex w-full p-3">
//             <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
//               Promotional Price
//             </h3>
//             <div className="w-full">
//               <input
//                 className="h-12 w-full border-2 border-gray-300 rounded-lg"
//                 {...register("promotionalPrice")}
//                 placeholder="promotional Price"
//               />
//             </div>
//           </div>
//
//           <div className="flex w-full p-3">
//             <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
//               Description
//             </h3>
//             <div className="w-full">
//               <textarea
//                 {...register("description")}
//                 className="h-32 w-full border-2 border-gray-300 rounded-lg"
//                 placeholder="description"
//               />
//             </div>
//           </div>
//
//           <div className="flex w-full p-3">
//             <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
//               Category
//             </h3>
//             <div className="w-full">
//               <select
//                 {...register("category")}
//                 className="h-12 w-full border-2 border-gray-300 rounded-lg"
//                 onChange={handleCategoryChange}
//               >
//                 {/*  {Object.keys(categorySample).map((category) => (*/}
//                 {/*    <option key={category} value={category}>*/}
//                 {/*      {category}*/}
//                 {/*    </option>*/}
//                 {/*))}*/}
//
//                 {categoryInfo?.map((category) => (
//                   <option key={category.name} value={category.name}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//
//           <div className="flex w-full p-3">
//             <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
//               SubCategory
//             </h3>
//             <div className="w-full">
//               <select
//                 {...register("subCategory")}
//                 className="h-12 w-full border-2 border-gray-300 rounded-lg"
//               >
//                 {options.map((option: any) => (
//                   <option key={option} defaultValue={option}>
//                     {categorySample[selectedCategoryName][option]}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//
          <div className="flex w-full p-3">
            <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
              Colors
            </h3>
            <div className="w-full">
              {colorFields.length === 0 && (
                <input
                  {...register(`colors.0`)}
                  className="h-12 w-full border-2 border-gray-300 rounded-lg mb-2"
                  placeholder="Color 1"
                />
              )}
              {colorFields.map((field, index) => (
                <input
                  key={field.id}
                  {...register(`colors.${index}`)}
                  className="h-12 w-full border-2 border-gray-300 rounded-lg"
                  placeholder={`Color ${index + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={handleAddColor}
                className="bg-gray-500 text-white p-2 rounded-lg mt-2"
              >
                Add Color
              </button>
            </div>
          </div>
//
//           <div className="flex w-full p-3">
//             <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
//               Color Buttons
//             </h3>
//             <div className="w-full">
//               {colorbuttonFields.length === 0 && (
//                 <input
//                   {...register(`colorbuttons.0`)}
//                   className="h-12 w-full border-2 border-gray-300 rounded-lg mb-2"
//                   placeholder="Color Button 1"
//                 />
//               )}
//               {colorbuttonFields.map((field, index) => (
//                 <input
//                   key={field.id}
//                   {...register(`colorbuttons.${index}`)}
//                   className="h-12 w-full border-2 border-gray-300 rounded-lg"
//                   placeholder={`Color Button ${index + 1}`}
//                 />
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddColorbutton}
//                 className="bg-gray-500 text-white p-2 rounded-lg mt-2"
//               >
//                 Add Colorbutton
//               </button>
//             </div>
//           </div>
//
//           <div className="flex w-full p-3">
//             <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
//               Highlights
//             </h3>
//             <div className="w-full">
//               {highlightFields.length === 0 && (
//                 <input
//                   {...register(`highlights.0`)}
//                   className="h-12 w-full border-2 border-gray-300 rounded-lg mb-2"
//                   placeholder="Highlight 1"
//                 />
//               )}
//               {highlightFields.map((field, index) => (
//                 <input
//                   key={field.id}
//                   {...register(`highlights.${index}`)}
//                   className="h-12 w-full border-2 border-gray-300 rounded-lg"
//                   placeholder={`Highlight ${index + 1}`}
//                 />
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddHighlight}
//                 className="bg-gray-500 text-white p-2 rounded-lg mt-2"
//               >
//                 Add Highlight
//               </button>
//             </div>
//           </div>
//
//           <div className="flex w-full p-3">
//             <h3 className="w-80 mr-10 font-bold text-2xl text-gray-700">
//               Tags
//             </h3>
//             <div className="w-full">
//               {tagFields.length === 0 && (
//                 <input
//                   {...register(`tags.0`)}
//                   className="h-12 w-full border-2 border-gray-300 rounded-lg mb-2"
//                   placeholder="Tag 1"
//                 />
//               )}
//               {tagFields.map((field, index) => (
//                 <input
//                   key={field.id}
//                   {...register(`tags.${index}`)}
//                   className="h-12 w-full border-2 border-gray-300 rounded-lg"
//                   placeholder={`Tag ${index + 1}`}
//                 />
//               ))}
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 className="bg-gray-500 text-white p-2 rounded-lg mt-2"
//               >
//                 Add Tag
//               </button>
//             </div>
//           </div>
//
//           <button
//             type={"submit"}
//             className="bg-gray-300 border-gray-500 rounded-lg text-2xl p-4 mt-6"
//           >
//             Add Product
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
//
// export default AdminAdd;
