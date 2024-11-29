import React, { useState, useEffect } from "react";

interface UploadedFile {
    name: string;
    size: number;
    url: string; // 이미지 URL
}

interface Props {
    onFileUpload: (files: File[]) => void; // 부모로 데이터를 전달하는 콜백 함수
}

const FileUploadWithPreview: React.FC<Props> = ({ onFileUpload }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    // 파일 선택 핸들러
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files) {
            processFiles(event.target.files);
        }
    };

    // 파일 처리 함수
    const processFiles = (fileList: FileList): void => {
        const selectedFiles = Array.from(fileList);

        // URL 생성 및 상태 업데이트
        const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);

        setFiles((prev) => {
            const updatedFiles = [...prev, ...selectedFiles];
            onFileUpload(updatedFiles); // 부모로 데이터 전송
            return updatedFiles;
        });
    };

    // 드래그 오버 핸들러
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    // 드롭 핸들러
    const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        if (event.dataTransfer.files) {
            processFiles(event.dataTransfer.files);
        }
    };

    // 클릭 이벤트로 숨겨진 파일 입력 요소 활성화
    const handleClick = (): void => {
        const inputElement = document.getElementById("file-input") as HTMLInputElement;
        if (inputElement) {
            inputElement.click();
        }
    };

    useEffect(() => {
        return () => {
            imagePreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imagePreviews]);

    return (
        <div className="relative flex flex-col items-center w-full">
            {/* 이미지 미리보기 */}
            <div className="w-full flex flex-wrap gap-4 mb-4">
                {imagePreviews.length > 0 ? (
                    imagePreviews.map((preview, index) => (
                        <img
                            key={index}
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="h-32 w-32 object-cover rounded border border-gray-300 shadow-md"
                        />
                    ))
                ) : (
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Default Preview"
                        className="h-32 w-32 object-cover rounded border border-gray-300 shadow-md"
                    />
                )}
            </div>

            {/* 업로드 박스 */}
            <div
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative z-10"
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                </div>

                <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default FileUploadWithPreview;
