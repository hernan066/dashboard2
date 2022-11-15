import { Box, Skeleton } from "@mui/material";
import { Container } from "@mui/system";

export const LoadingSkeleton = () => (
   <Container>
    <Skeleton variant="text" sx={{ fontSize: '3rem', maxWidth:'200px' }} />
    <Box
      sx={{
        height: "max-content",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      {[...Array(8)].map((_, idx) => (
        
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} id={idx + 'ske'}/>
      ))}
    </Box>
   </Container>
  );