import { Icon } from "@iconify/react";
import ProductTitle from "components/ui/ProductTitle";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface AdminProps {
  title?: string;
  referencePrice?: number;
  promotionalPrice?: number;
  category?: string;
  id?: number;
  image?: string[];
  tags?: string;
  colors?: string[];
}

const AdminAdd = ({
  title,
  referencePrice,
  promotionalPrice,
  category,
  id,
  image,
  colors,
  tags,
}: AdminProps) => {
  const adminTitle = ["title", "model", "id", "inventory"];
  const admininput = ["referencePrice", "promotionalPrice"];
  const [photoImg, setPhotoImg] = useState("/images/default_image.webp");
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors, isDirty },
  } = useForm();
  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      setPhotoImg(URL.createObjectURL(watchImage[0]));
    }
  }, [watchImage]);

  return (
    <div className={"bg-white"}>
      <form className={"mx-auto mb-32 max-w-7xl px-4 sm:px-6 lg:px-8"}>
        {/* Title, Breadcrumbs, Sort */}
        <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
          <div className="flex flex-col">
            <ProductTitle title={"Add Product"} />
          </div>
        </div>

        {/* 아래내용 */}
        <div className="flex flex-col items-center justify-center px-40 mt-10">
          <div className="grid grid-cols-10 w-full">
            <div className="col-span-4 flex flex-col items-center">
              <img src={photoImg} className="h-60 w-60" />
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
              {adminTitle.map((item) => (
                <div className="flex w-full px-5">
                  <div className="w-60 font-bold text-2xl text-gray-700">
                    {item}
                  </div>
                  <div className="w-full">
                    <input className="h-12 w-full border-2 border-gray-300 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {admininput.map((input) => (
            <div className="flex w-full p-3">
              <div className="w-80 mr-10 font-bold text-2xl text-gray-700">
                {input}
              </div>
              <div className="w-full">
                <input className="h-12 w-full border-2 border-gray-300 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default AdminAdd;
