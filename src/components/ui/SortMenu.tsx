import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ProductType } from "../../utiles/interfaces";

interface SortMenuProps {
    productData: ProductType[];
    setSortedData: React.Dispatch<React.SetStateAction<ProductType[]>>; // setSortedData는 배열을 수정하는 함수
}

const SortMenu: React.FC<SortMenuProps> = ({ productData, setSortedData }) => {
    const [sortCriteria, setSortCriteria] = useState("recommended");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 요소를 참조하기 위한 ref

    // 가격 정렬 함수 (가격이 undefined일 경우 0으로 처리)
    const sortData = (data: ProductType[], criteria: string): ProductType[] => {
        switch (criteria) {
            case "priceLowToHigh":
                return [...data].sort((a, b) => {
                    const priceA = a.price ?? 0;  // 가격이 undefined일 경우 0으로 처리
                    const priceB = b.price ?? 0;  // 가격이 undefined일 경우 0으로 처리
                    return priceA - priceB;
                });
            case "priceHighToLow":
                return [...data].sort((a, b) => {
                    const priceA = a.price ?? 0;  // 가격이 undefined일 경우 0으로 처리
                    const priceB = b.price ?? 0;  // 가격이 undefined일 경우 0으로 처리
                    return priceB - priceA;
                });
            case "recommended":
            default:
                return data;  // 추천순은 원본 데이터를 그대로 반환
        }
    };

    // 정렬 기준 변경 핸들러
    const handleSortChange = (criteria: string) => {
        setSortCriteria(criteria);
        const sorted = sortData(productData, criteria);
        setSortedData(sorted); // 부모 컴포넌트로 정렬된 데이터를 전달
        setIsOpen(false); // 항목을 클릭한 후 드롭다운 닫기
    };

    // 드롭다운 열림/닫힘 토글
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // 드롭다운 바깥 클릭 시 드롭다운 닫기
    useEffect(() => {
        // 바깥쪽 클릭을 감지하는 함수
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false); // 바깥을 클릭하면 드롭다운 닫기
            }
        };

        // document에 클릭 이벤트 리스너를 추가
        document.addEventListener("mousedown", handleClickOutside);

        // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    onClick={toggleDropdown}  // 드롭다운 토글
                >
                    Sort
                    <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                </button>
            </div>

            {/* 드롭다운 메뉴는 isOpen이 true일 때만 표시 */}
            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <button
                            onClick={() => handleSortChange("recommended")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-400 w-full"
                        >
                            추천순
                        </button>
                        <button
                            onClick={() => handleSortChange("priceLowToHigh")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-400 w-full"
                        >
                            가격 낮은순
                        </button>
                        <button
                            onClick={() => handleSortChange("priceHighToLow")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-400 w-full"
                        >
                            가격 높은순
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortMenu;
