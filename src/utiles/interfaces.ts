//Filters
export interface FilterPropsType {
    isLoading?: boolean;
    allCategories: string[];
    filters: filterType[];
    colors: string[];
    sizes: string[];
    setSortParams: (key: string, value: string) => void;
    deleteSortParams: (key: string) => void;
    searchParams: URLSearchParams;
    pageData?: string;
}

interface filterType {
    name: string;
}

export interface FilterProps {
    setSortParams: (key: string, value: string) => void;
    deleteSortParams: (key: string) => void;
    params: string | null;
    searchParams: URLSearchParams;
}

// prodcts
export interface ProductType {
    title: string;
    price: number;
    category: string;
    subCategory?: string;
    tags: string;
    registrationDate?:number;
    colors: string[];
    description: string;
    options: string;
    id: number;
    image: string[];
    details?: string;
    highlights?: string[];
}