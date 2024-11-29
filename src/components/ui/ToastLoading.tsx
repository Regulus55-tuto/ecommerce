import React, { forwardRef, useImperativeHandle } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastLoading = forwardRef((props, ref) => {
    // Toast 메시지 함수 정의
    const showSuccessToast = () => {
        toast.success("성공 메시지!");
    };

    const showErrorToast = () => {
        toast.error("에러 메시지!");
    };

    // 부모에서 사용할 수 있도록 ref로 함수 전달
    useImperativeHandle(ref, () => ({
        showSuccessToast,
        showErrorToast
    }));

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                draggable
            />
        </>
    );
});

export default ToastLoading;
