export interface FilterProps {
  category: string;
  setCategory: (value: string) => void;
  categoryList: string[];
  setCategoryList: (value: string[]) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  setPage: (value: number) => void;
  stockFilter: string;
  setStockFilter: (value: string) => void;
}
