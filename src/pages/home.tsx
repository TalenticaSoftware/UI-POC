import { Box, Container, SimpleGrid, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/banner.tsx";
import HomeCardBox from "../components/pageComponent/homeCardBox.tsx";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box as="main">
      <VStack align="stretch" spacing={8}>
        <Banner />
        <HomeCardBox />
      </VStack>
    </Box>
  );
};

export default Home;
