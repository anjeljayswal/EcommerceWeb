const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
            };

        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view: true,
            };
        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view: false,
            };
        case "GET_SORT_VALUE":
            // let userSortValue = document.getElementById("sort");
            // let sort_value = userSortValue.options[userSortValue.selectedIndex].value; 
            // console.log(sort_value);

            return {
                ...state,
                // sorting_value:sort_value,
                sorting_value: action.payload,

            }
        case "SORTING_PRODUCTS":
            let newSortData;
            // let tempSortProduct = [...action.payload];

            const { filter_products, sorting_value } = state;
            let tempSortProduct = [...filter_products];

            const sortingProducts = (a, b) => {
                if (sorting_value === "lowest") {
                    return a.price - b.price;
                }
                if (sorting_value === "highest") {
                    return b.price - a.price;
                }
                if (sorting_value === "a-z") {
                    return a.name.localeCompare(b.name);
                }
                if (sorting_value === "z-a") {
                    return b.name.localeCompare(a.name)
                }
            }

            // if(state.sorting_value === "lowest"){
            //     const sortingProducts = (a,b)=>{
            //         return a.price - b.price;
            //     }
            //     // newSortData = tempSortProduct.sort(sortingProducts);
            // }
            // if(state.sorting_value === "highest"){
            //     const sortingProducts = (a,b)=>{
            //         return b.price - a.price;
            //     }
            //     // newSortData = tempSortProduct.sort(sortingProducts);
            // }
            // if(state.sorting_value === "a-z"){
            //     newSortData = tempSortProduct.sort((a,b) =>

            //         a.name.localeCompare(b.name)
            //     );
            // }
            // if(state.sorting_value === "z-a"){
            //     newSortData = tempSortProduct.sort((a,b) =>

            //         b.name.localeCompare(a.name)
            //     );
            // }

            newSortData = tempSortProduct.sort(sortingProducts);

            return {
                ...state,
                filter_products: newSortData,

            }
        case "UPDATE_FILTER_VALUE":
            const { name, value } = action.payload;
            return {
                ...state,
                filters: {
                    ...state.filters,
                     [name]: value
                },
            }
        case "FILTER_PRODUCTS":
            let {all_products} =state;
            let tempFilterProduct = [...all_products];
            const { text, category, company }= state.filters;

            if(text){
                tempFilterProduct = tempFilterProduct.filter((currElem) =>{
                    return currElem.name.toLowerCase().includes(text);
                })
            }

            if(category !== "all"){
                tempFilterProduct = tempFilterProduct.filter((currElem)=>{
                    return currElem.category===category;
                })
            }
            if(company!=="all"){
                tempFilterProduct = tempFilterProduct.filter((currElem)=>{
                    return currElem.company.toLowerCase()===company.toLowerCase();
                })
            }
            return {
                ...state,
                filter_products: tempFilterProduct, // Update the filter_products array
            };

        default:
            return state;
    }
};

export default filterReducer;