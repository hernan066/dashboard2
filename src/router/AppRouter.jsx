import { Routes, Route, HashRouter } from "react-router-dom";
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

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
       
        <Route path="/" element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/form" element={<Form />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/line" element={<Line />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/geography" element={<Geography />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserCreate />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
      </Routes>
    </HashRouter>
  );
};
