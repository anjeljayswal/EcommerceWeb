const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
            let priceArr = action.payload.map((currElem) => currElem.price);
            console.log("price max", priceArr);
            // 1st way 
            // console.log(Math.max.apply(priceArr));

            // let maxprice = priceArr.reduce((initialVal, curElem) => 
            // Matj.max(initialVal,curElem),0)
            //  console.log(maxprice);

            let maxPrice = Math.max(...priceArr);
            console.log("MaxPrice", maxPrice);

            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice }
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
            let { all_products } = state;
            let tempFilterProduct = [...all_products];
            const { text, category, company, color, price } = state.filters;

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.name.toLowerCase().includes(text);
                })
            }

            if (category !== "all") {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.category === category;
                })
            }
            if (company !== "all") {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.company.toLowerCase() === company.toLowerCase();
                })
            }
            if (color !== "all") {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.colors.includes(color);
                });
            }
            if (price===0) {
                tempFilterProduct = tempFilterProduct.filter(
                    (currElem) => currElem.price === price)
            } else {
                tempFilterProduct = tempFilterProduct.filter(
                    (currElem) => currElem.price <= price)
            }
            return {
                ...state,
                filter_products: tempFilterProduct, // Update the filter_products array
            };
        
            case "CLEAR_FILTERS":
                return {
                    ...state,
                    filters:{
                        ...state.filters,
                        text:"",
                        category:"all",
                        company:"all",
                        color:"all",
                        maxPrice:0,
                        price:state.filters.maxPrice,
                        minPrice:state.filters.maxPrice,
                    }
                }



        default:
            return state;
    }
};

export default filterReducer;