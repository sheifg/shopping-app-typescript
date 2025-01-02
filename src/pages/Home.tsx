import { SyncLoader } from "react-spinners";
import Card from "../components/Card";
import Search from "../components/Search";
import { AppDispatch, RootStateType } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, getProducts } from "../store/productSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [search, setSearch] = useState<string>("");

  // const loading = false;
  // const error = false;
  // These ones are needed from the store:
  const { loading, error, productList, favorites } = useSelector(
    (state: RootStateType) => state.products
  );

  const { darkMode } = useSelector((state: RootStateType) => state.ui);

  const dispatch = useDispatch<AppDispatch>();

  // getProducts(): it will fecth all the data from api and update the state
  // Whenever there is a search, the content is updated
  useEffect(() => {
    dispatch(getProducts(search));
  }, [search]);

  console.log(productList);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Add to favorites the product
  const handleAddToFavorite = (product: Product) => {
    // It is necessary to check if the product is already included in the favorites or not
    if (favorites.find((item) => item.id === product.id)) {
      // toastify in dark mode appears in light color and there is also dark mode for that, so it is necessary to include it here
      toast.warning("Product already added to favorites!", {
        position: "top-center",
        theme: darkMode ? "dark" : "light",
      });
    } else {
      // addFavorite from productSlice.ts
      dispatch(addFavorite(product));
      toast.success("Product added to favorites!", {
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  return (
    <div className="container mx-auto pt-20 p-5">
      {/* They are being passed 2 parameters to Seach component: one is the state and the second is the function to update the state */}
      <Search search={search} handleSearch={handleSearch} />
      {loading && (
        <div className="my-52 text-center">
          <SyncLoader color="red" />
        </div>
      )}
      {error && (
        <div className="mt-52">
          <p className="text-center text-red-600">Something Went wrong</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {productList.map((item) => (
          <Card
            key={item.id}
            product={item}
            // If it is not sent info in this caption, it will complain about that - > the caption is not sent
            // So it is good to use typescript, it helps a lot to develop the app, with less errors
            // Just in case caption will be optional(caption?) in the Card, TS will not complain about that
            caption="ADD"
            handleClick={handleAddToFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
