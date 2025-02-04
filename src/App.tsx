import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";
import About from "./pages/about.tsx";
import Contact from "./pages/contact.tsx";
import Home from "./pages/home.tsx";
import theme from "./theme.ts";
import Blog from "./pages/blog.tsx";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box>
          <Header />

          <Flex direction="column" h="calc(100vh - 82px)" overflow={"auto"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Flex>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
