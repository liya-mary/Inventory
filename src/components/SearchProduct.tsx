 import type { SearchProps } from "../types/searchProps";

 function SearchProduct({search,setSearch,setPage}:SearchProps){
    return(
        <div>
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

        </div>
    )
 }
 export default SearchProduct;
 
 
 
