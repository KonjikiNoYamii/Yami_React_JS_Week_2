export const initialCart = {
    item:[]
}
export function cartReducers(state,action) {
    switch (action.type) {
        case "addCart":
            return {...state,item:[...state.item ,action.payload]}
        case "removeCart":
            return {...state,item:state.item.filter(i => i.id !== action.payload)}
        default:
            return state
    }
}