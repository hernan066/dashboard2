import { Routes, Route, HashRouter } from "react-router-dom";
import Bar from "../scenes/bar";
import Calendar from "../scenes/calendar/calendar";
import Contacts from "../scenes/contacts";
import Dashboard from "../scenes/dashboard";
import FAQ from "../scenes/faq";
import Form from "../scenes/form";
import Geography from "../scenes/geography";
import Invoices from "../scenes/invoices";
import Line from "../scenes/line";
import Login from "../scenes/login/Login";
import Pie from "../scenes/pie";
import Users from "../scenes/users";
import { UserCreate } from "../scenes/users/UserCreate";
import { UserEdit } from "../scenes/users/UserEdit";

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
        
        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<UserCreate />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
      </Routes>
    </HashRouter>
  );
};
