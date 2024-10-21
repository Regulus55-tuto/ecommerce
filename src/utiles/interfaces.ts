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
  title: string; // Galaxy Flip6
  model: string; // IJSF23-FAIONSD
  storage?: string; // 128GB
  referencePrice: number | number[]; // 130000
  promotionalPrice: number | number[]; // 1300000
  category: string; // smartphone
  subCategory?: string;
  tags: string; // flip-series
  registrationDate?: number;
  colors: string[]; // ["black", "white", "violet"],
  description: string; // The latest flip-serires
  options?: string;
  id: number; // 1
  image: string[]; // [~,~,~]
  details?: string;
  highlights?: string[]; // [~,~,~]
}
