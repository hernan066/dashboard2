import { useState } from "react";
import Sidebar from "../pages/global/Sidebar";
import Topbar from "../pages/global/Topbar";

export const Layout = ({ children }) => {
    const [isSidebar, setIsSidebar] = useState(true);
    return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        {children}
      </main>
    </div>
  );
};
