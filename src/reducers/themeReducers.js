export const initialTheme = {
  theme: "light",
};

export function themeReducers(state, action) {
  switch (action.type) {
    case "lightTheme":
      return { theme: "light" };
    case "darkTheme":
      return { theme: "dark" };
    default:
      return state;
  }
}
