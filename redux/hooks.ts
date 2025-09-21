import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import Cookies from "js-cookie";
import { setIsLoggedIn } from "./slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.authSlice.isLoggedIn,
  );

  const isHydrated = useSelector(
    (state: RootState) => state.authSlice.isHydrated,
  );

  const logInUser = (newToken: string) => {
    Cookies.set("token", newToken);
    dispatch(setIsLoggedIn(true));
  };

  const logOutUser = () => {
    dispatch(setIsLoggedIn(false));
  };
  return { isLoggedIn, isHydrated, logInUser, logOutUser };
};
