import { supabase } from '../supabase'
import type { Product } from '../types/product';
import { useEffect, useState } from 'react'
import Filters from './Filters';
import Sorting from './Sorting';



function Products(){

    const [productList,setProductList]=useState<Product[]>([]);
    const [page,setPage]=useState<number>(1);
    const [count,setCount]=useState<number>(0);
    const [search,setSearch]=useState<string>("");
    const [category,setCategory]=useState<string>("");
    const [categoryList,setCategoryList]=useState<string[]>([]);
    const [minPrice,setMinPrice]=useState<string>("0");
    const [maxPrice,setMaxPrice]=useState<string>("");
    const [stockFilter,setStockFilter]=useState<string>("");
    const [sortBy,setSortBy]=useState<string>("created_at");
    const [sortOrder,setSortOrder]=useState<"asc"|"desc">("desc");
    // const [showFilters,setShowFilters]=useState<boolean>(false);
    

    const PAGE_SIZE=10;
    const totalPages:number=Math.ceil(count/PAGE_SIZE);

    useEffect(()=>{
      const fetchCategories=async ()=>{
        try {

      const {data,error}=await supabase.from("products").select("category");
        if(error){
          throw error;
        }
        const uniqueCategories=[...new Set(data?.map((item) => item.category))
        ]
        setCategoryList(uniqueCategories);

        } catch (error) {
          console.error("Error fetching categories: ",error);
        }
      }
      fetchCategories();

    },[])


    useEffect(()=>{
        const fetchData=async()=>{
        try {

          const from=(page-1)*PAGE_SIZE;
          const to= from+PAGE_SIZE-1;

          let query=supabase.from("products").select("*",{count:"exact"});

          if(search){
            query=query.ilike("name",`%${search}%`);
          }
          if(category){
            query=query.eq("category",category);
          }

          if(minPrice !==""){
            query=query.gte("price",Number(minPrice));
            console.log("minprice products: ",query);
          }

          if(maxPrice !==""){
            query=query.lte("price",Number(maxPrice));
            console.log("maxprice products: ",query);

          }

          if(stockFilter==="in"){
            query=query.gt("stock_quantity",0);
          }

          if(stockFilter==="out"){
            query=query.eq("stock_quantity",0);
          }

          query=query.order(sortBy,{ascending:sortOrder==="asc"});
          console.log("sorted query: ",query);


            const {data,error,count} = await query
            .range(from,to);

            console.log("products: ",data);
            if (error) throw error;
            if(data){
            setProductList(data);
            }
            if(count){
              setCount(count);
            }

        } catch (error) {
            console.error("Error fetching products : ",error);
        }
        } 

        fetchData();
    },[page,search,category,minPrice,maxPrice,stockFilter,sortBy,sortOrder])

    const handleSearchChange = (value: string) => {
      setSearch(value);
      setPage(1);
    };

  return (
    <div>
      <div>
        {/* <button
        onClick={()=>setShowFilters(!showFilters)}
        >

        </button> */}
        <Filters 
        search={search} 
        setSearch={handleSearchChange} 
        category={category} 
        setCategory={setCategory} 
        categoryList={categoryList} 
        setCategoryList={setCategoryList}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        setPage={setPage}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        />
      </div>
      <div>
        <Sorting 
        sortBy={sortBy} 
        setSortBy={setSortBy} 
        sortOrder={sortOrder} 
        setSortOrder={setSortOrder}
        setPage={setPage}/>
      </div>
      <div className='flex flex-wrap gap-6 mt-6'>
        {productList.map((item:Product)=>{
          return <div key={item.id} className="rounded-lg border shadow-sm overflow-hidden bg-white border-slate-200 shadow-slate-950/5 w-96">
          <div className="w-full h-max rounded px-3.5 py-2.5">
            <div className="mb-2  items-center ">
              <h5 className="font-sans antialiased font-bold text-xl md:text-2xl lg:text-3xl text-current">{item.name}</h5>
              <h6 className="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">{item.price}€</h6>
            </div>
            <p className="font-sans antialiased text-base text-slate-600">{item.stock_quantity} left</p>
            <p className="font-sans antialiased text-base text-slate-600">{item.category}</p>

          </div>
          <div className="w-full px-3.5 pt-2 pb-3.5 rounded"><button className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-200 border-slate-200 text-slate-800 hover:bg-slate-100 hover:bg-slate-100" data-shape="default" data-width="full">Add to Cart</button></div>
        </div>
        
          
          
          
        //   <div className='bg-sky-500/50 h-40 ' key={item.id}>
        //     <h2 className='text-lg'>{item.name}</h2> <br />
        //     <span>{item.category}</span> <br />
        //     <span>Price: {item.price}</span> <br />
        //     <span>{item.stock_quantity} Available</span>
        //   </div>
        })}
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-center mt-10  gap-4'>
        <button className='bg-stone-400   ' disabled={page===1} onClick={()=>{
          setPage((prev)=>prev-1);
        }}> <span className='m-4'>
          Previous
          </span>
        </button>
        <span>
          page{ page} of {totalPages}
        </span>

        <button className='bg-stone-400   ' disabled={page===totalPages} onClick={()=>
          setPage((prev)=>prev+1)}>
            <span className='m-4'>
              Next
            </span>
        </button>
      </div>
      <p>Total products:{count}</p>


    </div>
  )
}
export default Products;