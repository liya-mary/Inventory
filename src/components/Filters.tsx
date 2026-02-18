import type { FilterProps } from '../types/filterProps';

function Filters({
  category,
  setCategory,
  categoryList,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  setPage,
  stockFilter,
  setStockFilter,
}: FilterProps) {
  const clearAllFilters = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setStockFilter('');
    setPage(1);
  };

  return (
    <div className="flex flex-wrap justify-between gap-3 m-3">
      {/* price range */}
      <div>
        <div className="flex flex-wrap gap-4">
          <input
            className="w-40 aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 "
            type="number"
            min="0"
            placeholder="Min price "
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setPage(1);
            }}
          />

          <input
            className=" w-40 aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 "
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* category dropdown */}
      <div>
        <select
          className="aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 "
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categoryList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* stock filter */}
      <div>
        <select
          className="aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 "
          value={stockFilter}
          onChange={(e) => {
            setStockFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All stock</option>
          <option value="in">In stock</option>
          <option value="out">Out of stock</option>
        </select>
      </div>
      <button
        onClick={clearAllFilters}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-red-600 "
      >
        Clear All Filters
      </button>
    </div>
  );
}

export default Filters;
