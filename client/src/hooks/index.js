import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { MovieContext } from "../context/MoviesProvider";
import { NotificationContext } from "../context/NotificationProvider";
import { SearchContext } from "../context/SearchProvider";
import { ThemeContext } from "../context/ThemeProvider";

export const useTheme = () => useContext(ThemeContext);
export const useNotification = () => useContext(NotificationContext);
export const useAuth = () => useContext(AuthContext);
export const useSearch = () => useContext(SearchContext);
export const useMovies = () => useContext(MovieContext);
