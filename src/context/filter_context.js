import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productContext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters:{
    text:"",
    category:"all",
    company:"all"

  }
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  // to set the list view
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  //   sorting function 
  const sorting = (event) => {
    // dispatch({ type: "GET_SORT_VALUE" });
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload:userValue });
  };

  //update the filter values
  const updateFilterValue =(event)=>{
    let name = event.target.name;
    let value= event.target.value;
    if (name === "category") {
      dispatch({ type: "FILTER_PRODUCTS" });
    }
    return dispatch({type:"UPDATE_FILTER_VALUE",payload:{name,value}})
  }

  // to sort the product 
  useEffect(() => {
    // console.log("hii");
    // dispatch({ type: "SORTING_PRODUCTS", payload: products });
    dispatch({type:"FILTER_PRODUCTS"})
    dispatch({ type: "SORTING_PRODUCTS"});
  }, [products,state.sorting_value, state.filters])

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, sorting,updateFilterValue }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};