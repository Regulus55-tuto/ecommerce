import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastLoading = () => {
    const handleSubmit = async () => {
        toast.info("로딩 중..."); // 로딩 메시지
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 로딩 시뮬레이션
        toast.success("제출 성공!"); // 성공 메시지
    };

    return (
        <div>
            <button onClick={handleSubmit}>제출</button>
            <ToastContainer />
        </div>
    );
};

export default ToastLoading;
