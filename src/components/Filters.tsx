import type { FilterProps } from "../types/filterProps"

function Filters({search,setSearch,category,setCategory,categoryList, minPrice,setMinPrice,maxPrice,setMaxPrice,setPage,stockFilter,setStockFilter}:FilterProps){

    return(
        <div className="flex flex-wrap justify-between gap-3" >
            {/* search */}

            <div className="w-72">
                <div className="relative w-full">
                    <input 
                    type="text"
                    placeholder="Search by product name..." 
                    className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 " 
                    value={search}
                    onChange={(e)=>{
                        setSearch(e.target.value);
                        setPage(1);

                    }}
                    />
                </div>
            </div>



            {/* price range */}
            <div>

            <span className="text-slate-300">Price Range</span>

            <div className="flex flex-wrap gap-4">
                <input 
                className=" aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 " 
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e)=>{
                    setMinPrice(e.target.value);
                    setPage(1);

                }}
                />


                <input className="aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 " 
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e)=>{
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
                onChange={(e)=>{
                    setCategory(e.target.value);
                    setPage(1);
                }}
                >
                    <option value="">All Categories</option>
                    {categoryList.map((item)=>(
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>

            </div>


            {/* stock filter */}
            <div>
                <select 
                className="aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 " 
                value={stockFilter}
                onChange={(e)=>{
                    setStockFilter(e.target.value);
                    setPage(1);
                }}
                >
                    <option value="">All stock</option>
                    <option value="in">In stock</option>
                    <option value="out">Out of stock</option>                   

                </select>
            </div>


        </div>

    )

}

export default Filters