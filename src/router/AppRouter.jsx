import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import Bar from "../pages/bar";
import Calendar from "../pages/calendar/calendar";
import Contacts from "../pages/contacts";
import Dashboard from "../pages/dashboard";
import FAQ from "../pages/faq";
import Form from "../pages/form";
import Geography from "../pages/geography";
import Invoices from "../pages/invoices";
import Line from "../pages/line";
import Login from "../pages/login/Login";
import Pie from "../pages/pie";
import { UserList } from "../pages/users/UserList";
import { UserCreate } from "../pages/users/UserCreate";
import { UserEdit } from "../pages/users/UserEdit";
import { UserDetails } from "../pages/users/UserDetails";
import { useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { PublicRoute } from "./PublicRoutes";
import { PrivateRoute } from "./PrivateRoutes";

export const AppRouter = () => {
  const { checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <Routes>
      {/* public */}
      <Route path="/login"element={               <PublicRoute> <Login /> </PublicRoute>}/>
      {/* private */}
      <Route path="/" element={                   <PrivateRoute> <Dashboard />  </PrivateRoute>} />
      <Route path="/contacts" element={           <PrivateRoute> <Contacts />   </PrivateRoute>} />
      <Route path="/invoices" element={           <PrivateRoute> <Invoices />   </PrivateRoute>} />
      <Route path="/form" element={               <PrivateRoute> <Form />       </PrivateRoute>} />
      <Route path="/bar" element={                <PrivateRoute> <Bar />        </PrivateRoute>} />
      <Route path="/pie" element={                <PrivateRoute> <Pie />        </PrivateRoute>} />
      <Route path="/line" element={               <PrivateRoute> <Line />       </PrivateRoute>} />
      <Route path="/faq" element={                <PrivateRoute> <FAQ />        </PrivateRoute>} />
      <Route path="/calendar" element={           <PrivateRoute> <Calendar />   </PrivateRoute>} />
      <Route path="/geography" element={          <PrivateRoute> <Geography />  </PrivateRoute>} />

      <Route path="/users" element={              <PrivateRoute> <UserList />   </PrivateRoute>} />
      <Route path="/users/new" element={          <PrivateRoute> <UserCreate /> </PrivateRoute>} />
      <Route path="/users/edit/:id" element={     <PrivateRoute> <UserEdit />   </PrivateRoute>} />
      <Route path="/users/details/:id" element={  <PrivateRoute> <UserDetails/> </PrivateRoute>} />
    </Routes>
  );
};
