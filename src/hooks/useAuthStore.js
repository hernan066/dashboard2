import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../api/apiRequest";

import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await apiRequest.post("/auth/login", { email, password });
      dispatch(
        onLogin({ name: data.user.name, _id: data.user._id, token: data.token })
      );
    } catch (error) {
        console.log(error);
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  /* const startRegister = async({ email, password, name }) => {
        dispatch( onChecking() );
        try {
            const { data } = await apiRequest.post('/auth/new',{ email, password, name });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
            
        } catch (error) {
            dispatch( onLogout( error.response.data?.msg || '--' ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    } */

  const checkAuthToken = async () => {
    const user = JSON.parse(localStorage.getItem("persist:root"))?.auth;
    const currentUser = user && JSON.parse(user).user;
    const token = currentUser?.token;
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await apiRequest.get("auth/revalidate_token");
      dispatch(
        onLogin({ name: data.user.name, _id: data.user._id, token: data.token })
      );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    checkAuthToken,
    startLogin,
    startLogout,
  };
};
