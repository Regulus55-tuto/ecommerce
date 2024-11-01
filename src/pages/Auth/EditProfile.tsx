import React, { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface profileType {
  username: string;
  id: string;
  profileImg: string;
  email: string;
  image?: any;
  //   image?: string | Blob | File;
}

const EditProfile = () => {
  //   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<profileType>({
    // mode: "onSubmit",
    // defaultValues: {
    //   username: "ahri",
    //   id: "ksdjflsdjf3-sadf",
    //   email: "abc@abc.com",
    //   image: null,
    // },
  });

  // 프로파일정보
  const [profileInfo, setProfileInfo] = useState<profileType | null>(null);
  const getProfileData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const result = await axios.get("http://localhost:8000/api/auth", config);
      setProfileInfo(result.data.body);
      console.log("result", result.data.body);
    } catch (e) {
      console.log(e);
    }
  };

  // 이미지
  const watchImage = watch("image");
  const [photoImg, setPhotoImg] = useState("/images/default_image.webp");
  //   useEffect(() => {
  //     if (watchImage && watchImage instanceof File) {
  //       // 유저가 이미지 넣은게 있으면
  //       setPhotoImg(URL.createObjectURL(watchImage)); //사진을 photoImg 에 넣는다
  //     }
  //   }, [watchImage]);

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      // 유저가 이미지 넣은거 있으면
      setPhotoImg(URL.createObjectURL(watchImage[0])); // 유저의 이미지를 사진에 넣는다
    }
  }, [watchImage]);

  //   제출
  const submit = (data: any) => {
    console.log("dataaaaa", data);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className={"w-full h-full py-10 grid grid-cols-5 lg:grid-cols-11"}
      >
        <div className={"lg:col-span-1"} />
        {/*왼쪽박스*/}
        <div
          className={
            "border-2 border-gray-400 p-8 rounded-lg col-span-3 m-6 max-w-md pb-14"
          }
        >
          <div className={"flex justify-center "}>
            <LazyLoadImage
              // src={profileInfo?.profileImg ? profileInfo.profileImg : '/images/default_image.webp'}
              src={photoImg}
              alt="Profile Image"
              className={"h-full w-full rounded-lg border border-gray-600"}
            />
          </div>

          <div className={"flex flex-col items-center justify-center mt-4"}>
            <div className="flex flex-col items-center justify-end text-gray-500 mt-2">
              <input
                {...register("image")}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
              />
              <div>JPG, JPEG, PNG, or WEBP</div>
            </div>
          </div>
        </div>

        {/*오른쪽박스*/}
        <div
          className={
            "border-2 border-gray-400 px-16 py-8 rounded-lg col-span-6 m-6"
          }
        >
          {/* username */}
          <div className={"grid grid-cols-5 justify-start items-center mb-4"}>
            <div
              className={
                "col-span-2 text-2xl md:text-3xl lg:text-3xl w-80 text-gray-700 font-bold"
              }
            >
              Username :
            </div>
            <input
              {...register("username")}
              type="text"
              className="col-span-3 bg-gray-50 border-2 border-gray-300 w-full p-2 rounded-lg text-2xl md:text-3xl lg:text-3xl text-gray-700 font-bold"
            />
          </div>

          {/* email */}
          <div className={"grid grid-cols-5 justify-start items-center mb-4"}>
            <div
              className={
                "col-span-2 text-2xl md:text-3xl lg:text-3xl w-80 text-gray-700 font-bold"
              }
            >
              Email :
            </div>
            <input
              {...register("email")}
              type="text"
              className="col-span-3 bg-gray-50 border-2 border-gray-300 w-full p-2 rounded-lg text-2xl md:text-3xl lg:text-3xl text-gray-700 font-bold"
            />
          </div>

          <div className={"grid grid-cols-4 justify-start items-center mb-4"}>
            <div className="col-span-1" />
            <button
              type="submit"
              className={
                "col-span-2 text-xl font-medium bg-violet-500 text-gray-200 w-full h-16 border border-gray-600 rounded-lg p-2 mt-8 active:bg-violet-400 duration-100"
              }
            >
              Edit Personal Information
            </button>
          </div>
        </div>

        <div className={"lg:col-span-1"} />
      </form>
    </>
  );
};

export default EditProfile;
