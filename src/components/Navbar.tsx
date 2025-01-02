import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootStateType } from "../store/store";
import { toggleDarkMode } from "../store/uiSlice";

// It can be used interface or type
// interface NavbarProps = {
//   title: string;
// };

type NavbarProps = {
  title: string;
};
// It can be defined functions in JS in 2 ways:

// 1 - Function declaration (using function keyboard)
// function add(a: number, b: number) {
//   return a + b;
// }

// 2 - Function expression (It is needed to explain that it is a function, for that reason it is written isnide in a variable)
// const add = function (a: number, b: number) {
//   return a + b;
// };

// Using arrow function
// export default Navbar:React.FC<NavbarProps> = ({ title }) => {
// Using name function
// const  Navbar : React.FC<NavbarProps> = ({ title }) => {

export default function Navbar({ title }: NavbarProps) {
  // RootStateType comes from store: export type RootStateType = ReturnType<typeof store.getState>;
  const { darkMode } = useSelector((state: RootStateType) => state.ui);
  const dispatch = useDispatch();
  return (
    <nav className="navbar fixed top-0 left-0 right-0">
      <Link to="/" className="font-bold italic">
        {/* Instead of writting title, it can be passed props */}
        {title}
      </Link>
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/favorites">Favorites</Link>
        <button
          // To access the functions/actions in the slice, it is necessary to use disptach
          onClick={() => dispatch(toggleDarkMode())}
          type="button"
          className="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none 
          hover:bg-gray-100 focus:ring-4 focus:ring-gray-2 font-medium rounded-lg text-sm px-4 py-2
          dark:text-white dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:ring-gray-700
          "
        >
          {darkMode ? (
            <i className="bi bi-sun-fill"></i>
          ) : (
            <i className="bi bi-moon-fill"></i>
          )}
        </button>
      </div>
    </nav>
  );
}
