import { Box } from "@mui/material";
import Header from "../../components/Header";
import { Layout } from "../../components/Layout";
//import PieChart from "../../components/PieChart";

const Pie = () => {
  return (
    <Layout>
      <Box m="20px">
        <Header title="Pie Chart" subtitle="Simple Pie Chart" />
        <Box height="75vh">
        {/*   <PieChart /> */}
        </Box>
      </Box>
    </Layout>
  );
};

export default Pie;
