import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setTransactions } from "../redux/userSlice";
import { jwtDecode } from "jwt-decode";

// custom hook to decode and logout the token when it expires
const useAutoLogout = (navigate) => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    const decoded = jwtDecode(token);
    if (!decoded.exp) return;
  
    const currentTime = Date.now();
    const expirationTime = decoded.exp * 1000;
    const timeout = expirationTime - currentTime;
  
    if (timeout <= 0) {
      dispatch(
        setLogin({
          user: null,
          token: null,
        })
      );
      dispatch(setTransactions({transactions: []}));
      navigate("/login");
    } else {
      const timer = setTimeout(() => {
        dispatch(
          setLogin({
            user: null,
            token: null,
          })
        );
        dispatch(setTransactions({transactions: []}));
        navigate("/login");
      }, timeout);

      return () => clearTimeout(timer);
    };
  },[token, dispatch])
};

export default useAutoLogout;