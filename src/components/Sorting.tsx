import type { SortingProps } from '../types/sortingProps';

function Sorting({ sortBy, setSortBy, sortOrder, setSortOrder }: SortingProps) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 m-3">
        {/* Sort Field */}
        <select
          className=" aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 "
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="created_at">Created Date</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stock_quantity">Stock Quantity</option>
        </select>

        {/* Sort Order */}
        <select
          className=" aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 "
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value as 'asc' | 'desc');
          }}
          // className="border px-4 py-2 rounded-lg"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}
export default Sorting;
