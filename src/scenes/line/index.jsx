import { Box } from "@mui/material";
import Header from "../../components/Header";
import { Layout } from "../../components/Layout";
//import LineChart from "../../components/LineChart";

const Line = () => {
  return (
    <Layout>
      <Box m="20px">
        <Header title="Line Chart" subtitle="Simple Line Chart" />
        <Box height="75vh">
       {/*    <LineChart /> */}
        </Box>
      </Box>
    </Layout>
  );
};

export default Line;
