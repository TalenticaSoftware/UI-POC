import React from "react";
import BlogPostWithImage from "../../components/card.tsx";
import { blogData } from "../../data/homepageData.ts";
import { Container, SimpleGrid } from "@chakra-ui/react";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "full",
};

const HomeCardBox = () => {
  return (
    <Container maxW="container.xl" sx={containerStyles}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        {blogData.map((blog) => (
          <BlogPostWithImage key={blog.id} {...blog} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default HomeCardBox;
