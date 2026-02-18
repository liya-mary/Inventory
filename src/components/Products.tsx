import { supabase } from '../supabase';
import type { Product } from '../types/product';
import { useEffect, useState } from 'react';
import Filters from './Filters';
import Sorting from './Sorting';
import SearchProduct from './SearchProduct';

function Products() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [stockFilter, setStockFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showSorting, setShowSorting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const PAGE_SIZE = 10;
  const totalPages: number = Math.ceil(count / PAGE_SIZE);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('category');
        if (error) {
          throw error;
        }
        const uniqueCategories = [
          ...new Set(data?.map((item) => item.category)),
        ];
        setCategoryList(uniqueCategories);
      } catch (error: unknown) {
        console.error('Error fetching categories: ', error);
        if (error instanceof Error) {
          setErrorMessage(
            'Network error. Please check your internet connection.',
          );
        } else {
          setErrorMessage('Something went wrong while loading products.');
        }
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        let query = supabase.from('products').select('*', { count: 'exact' });

        if (search) {
          query = query.ilike('name', `%${search}%`);
        }
        if (category) {
          query = query.eq('category', category);
        }

        if (minPrice !== '') {
          query = query.gte('price', Number(minPrice));
          console.log('minprice products: ', query);
        }

        if (maxPrice !== '') {
          query = query.lte('price', Number(maxPrice));
          console.log('maxprice products: ', query);
        }

        if (stockFilter === 'in') {
          query = query.gt('stock_quantity', 0);
        }

        if (stockFilter === 'out') {
          query = query.eq('stock_quantity', 0);
        }

        query = query.order(sortBy, { ascending: sortOrder === 'asc' });
        console.log('sorted query: ', query);

        const { data, error, count } = await query.range(from, to);

        console.log('products: ', data);
        if (error) throw error;
        if (data) {
          setProductList(data);
        }
        if (count) {
          setCount(count);
        }
      } catch (error) {
        console.error('Error fetching products : ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    page,
    search,
    category,
    minPrice,
    maxPrice,
    stockFilter,
    sortBy,
    sortOrder,
  ]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div>
      <h5 className="font-sans antialiased font-bold text-5xl md:text-6xl lg:text-7xl text-gray-200">
        Inventory
      </h5>
      <div className="flex flex-wrap justify gap-3 m-3 ">
        <div>
          <SearchProduct
            search={search}
            setSearch={handleSearchChange}
            setPage={setPage}
          />
        </div>

        <div>
          <button
            className=" aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 "
            onClick={() => setShowFilters(!showFilters)}
          >
            {' '}
            Apply Filters
          </button>
          {showFilters && (
            <Filters
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
          )}
        </div>
        <div>
          <button
            className=" aria-disabled:cursor-not-allowed outline-none focus:outline-none text-slate-800 dark:text-slate placeholder:text-slate-600/60 bg-slate-300 ring-transparent border border-slate-200 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 text-sm rounded-md py-2 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-700 hover:ring-slate-800 focus:border-slate-800 "
            onClick={() => setShowSorting(!showSorting)}
          >
            {' '}
            Sort Products
          </button>
          {showSorting && (
            <Sorting
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              setPage={setPage}
            />
          )}
        </div>
      </div>
      {loading && (
        <div>
          <p>Loading :)</p>
        </div>
      )}
      {productList.length === 0 && <div>No Products Found :(</div>}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-wrap gap-6 mt-6">
        {productList.map((item: Product) => {
          return (
            <div
              key={item.id}
              className="rounded-lg border shadow-sm overflow-hidden bg-white border-slate-200 shadow-slate-950/5 w-96"
            >
              <div className="w-full h-max rounded px-3.5 py-2.5">
                <div className="mb-2  items-center ">
                  <h5 className="font-sans antialiased font-bold text-xl md:text-2xl lg:text-3xl text-current">
                    {item.name}
                  </h5>
                  <h6 className="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
                    {item.price}€
                  </h6>
                </div>
                <p className="font-sans antialiased text-base text-slate-600">
                  {item.stock_quantity} left
                </p>
                <p className="font-sans antialiased text-base text-slate-600">
                  {item.category}
                </p>
              </div>
              <div className="w-full px-3.5 pt-2 pb-3.5 rounded">
                <button
                  className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-200 border-slate-200 text-slate-800 hover:bg-slate-100 hover:bg-slate-100"
                  data-shape="default"
                  data-width="full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* pagination */}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-10  gap-4">
        <button
          className="bg-gray-300   "
          disabled={page === 1}
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
        >
          {' '}
          <span className="m-4 ">Previous</span>
        </button>
        <span>
          page{page} of {totalPages}
        </span>

        <button
          className="bg-gray-300   "
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <span className="m-4">Next</span>
        </button>
      </div>
      <p>Total products:{count}</p>
    </div>
  );
}
export default Products;
