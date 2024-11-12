import React, { useState } from "react";
import ProductTitle from "../../components/ui/ProductTitle";
import { useForm } from "react-hook-form";
import Checkbox from "../../components/ui/Checkbox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Icon } from "@iconify/react";
import { DeleteModal } from "components/ui";

const Carts = () => {
  const { register, handleSubmit, formState, setError } = useForm();
  const [submitType, setSubmitType] = useState<string | null>(null);

  const mock = ["a", "b", "c", "d", "e"];

  const submit = (data: any) => {
    try {
      console.log("data", data);

      if (submitType === "purchase") {
        console.log("purch data", data);
      } else if (submitType === "delete") {
        console.log("delete data", data);
      } else {
        console.log("no submit type");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={"bg-white"}>
      <main className={"mx-auto mb-2 max-w-7xl px-4 sm:px-6 lg:px-8"}>
        {/* Title, Breadcrumbs, Sort */}
        <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
          <div className="flex flex-col">
            {/* page title */}
            <ProductTitle title={"Carts"} />
          </div>
        </div>

        {/*아래내용*/}
        <form
          onSubmit={handleSubmit(submit)}
          className={
            "grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 w-full mt-10"
          }
        >
          <div className={"col-span-2 w-4/5 xl:w-full mx-auto xl:mx-0"}>
            {/* 선택삭제버튼 */}
            <button
              type={"submit"}
              onClick={() => setSubmitType("delete")}
              className="mb-4 text-md bg-violet-500 text-white rounded-lg py-2 px-4"
            >
              Delete Selected Item
            </button>
            <div className="flex items-center justify-center">
              <table className="table-auto w-full">
                <tr className="text-center font-semibold text-xl text-gray-700 border-y-4 border-gray-500 py-1">
                  {/*제목부분 */}
                  <td className="py-1">ㅁ</td>
                  <td className="py-1">Product</td>
                  <td className="py-1">Quantity</td>
                  <td className="py-1">Total Price</td>
                  <td className="py-1">Delete</td>
                </tr>

                {mock.map((item, i) => (
                  <tr className="text-center" key={i}>
                    {/*내용부분 */}
                    <td className="border-y border-gray-500 px-2 font-bold text-xl ">
                      <Checkbox
                        type="checkbox"
                        {...register(`consent.${i}`)}
                        // labelText={item.label}
                        labelText={""}
                        id={item}
                        key={item}
                        className={"flex items-center justify-center"}
                        // onChange={(e) =>
                        //   handleSingleCheck(e.target.checked, item.id, item.key)
                        // }
                        // checked={checkItems.includes(item.id)}
                      />
                    </td>
                    <td className=" border-b border-gray-500 text-lg text-gray-700 font-bold w-1/2">
                      <div className="flex items-between justify-start w-full h-28 ml-12">
                        <LazyLoadImage
                          src="/images/default_image.webp"
                          className="w-28 h-28"
                        />
                        <div className="flex flex-col items-start justify-start ml-2">
                          <div className="font-semibold text-lg text-gray-700">
                            Galaxy Watch7
                          </div>
                          <div className="font-normal text-sm text-gray-400">
                            modelmyeong
                          </div>
                          <div className="font-normal text-sm text-gray-400">
                            Color :{" "}
                            <span
                              style={{ color: "red" }}
                              className="text-base font-medium"
                            >
                              black
                            </span>
                          </div>
                          <div className="font-bold text-lg text-gray-600 mt-2">
                            ₩ 1,321,000
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-gray-500 px-2 h-40 font-medium text-lg">
                      2
                    </td>
                    <td className="border-b border-gray-500 px-2 h-40 font-medium text-lg">
                      ₩ 2,642,000
                    </td>
                    {/*쓰레기통*/}
                    <td className="border-b border-gray-500 px-2 h-40 font-medium text-lg">
                      <div className={"flex items-center justify-center"}>
                        <Icon
                          icon="fluent:delete-24-regular"
                          className="cursor-pointer"
                          width="36"
                          //   onClick={() => openModal(item.id, item.name)}
                        />
                        {/* {isModalOpen && selectedItemId !== null && (
                          <DeleteModal
                            onClose={closeModal}
                            onConfirm={() =>
                              handleDelete(selectedItemId, selectedItemName)
                            }
                            productId={selectedItemId}
                            productName={selectedItemName}
                          />
                        )} */}
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>

          {/* 오른쪽 결제정보 */}
          <div
            className={
              "col-span-1 text-center border border-gray-800 rounded-sm mt-20 xl:mt-0 xl:ml-10 w-1/2 xl:w-5/6 h-72 px-4 py-2 xl:w-5/6 mx-auto xl:mx-0"
            }
          >
            <div
              className={
                "text-gray-800 text-xl font-bold mt-2 pb-4 border-b-2 border-gray-800"
              }
            >
              Payment Information
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className={"text-gray-700 text-sm font-normal"}>
                Reference Price
              </div>
              <div className={"text-gray-800 text-lg font-normal"}>
                ₩ 10,035,000
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className={"text-gray-700 text-sm font-normal"}>
                Discount
              </div>
              <div className={"text-gray-800 text-lg font-normal"}>
                ₩ 1,100,350
              </div>
            </div>

            <div className={"border-t-2 border-gray-800 mt-2"}>
              <div className="flex items-center justify-between">
                <div className={"text-gray-800 text-base font-bold my-6"}>
                  Total Price
                </div>
                <div className={"text-gray-800 text-base font-bold"}>
                  ₩ 10,350,846
                </div>
              </div>

              <button
                type={"submit"}
                onClick={() => setSubmitType("purchase")}
                className={
                  "bg-violet-500 hover:bg-violet-600 text-white text-lg w-full font-medium rounded-lg px-4 py-1"
                }
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
