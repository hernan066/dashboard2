import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { Layout } from "../../components/Layout";

const Bar = () => {
  return (
    <Layout>
      <Box m="20px">
        <Header title="Bar Chart" subtitle="Simple Bar Chart" />
        <Box height="75vh">
          <BarChart />
        </Box>
      </Box>
    </Layout>
  );
};

export default Bar;
