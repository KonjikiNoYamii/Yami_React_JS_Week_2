import { createContext, useReducer } from "react";
import { initialTheme, themeReducers } from "../reducers/themeReducers";

export const ThemeContext = createContext()

export function ThemeProvider({children}) {
    const [state, dispatch] = useReducer(themeReducers, initialTheme)

    const toggleTheme = ()=> {
        if (state.theme === "light") {
            dispatch({type: "darkTheme" })
        }else{
            dispatch({type: "lightTheme"})
        }
    }
    return (
        <ThemeContext.Provider value={{theme: state.theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}