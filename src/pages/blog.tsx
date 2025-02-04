import React from "react";
import { useParams } from "react-router-dom";
import { Container, Text, Image, VStack } from "@chakra-ui/react";
import { blogData } from "../data/homepageData.ts";

const Blog = () => {
  const { id } = useParams<{ id: string }>();

  const blog = blogData.find((item) => item.id === parseInt(id || "", 10));

  if (!blog) {
    return (
      <Container maxW="container.md" mt={8}>
        <Text>Blog not found</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" h={"full"} my={8}>
      <Image src={blog.imageUrl} alt={blog.title} width={"100%"} />
      <VStack align="start" spacing={4} mt={4}>
        <Text fontSize="sm" color="gray.500">
          {blog.category}
        </Text>
        <Text fontWeight="bold" fontSize="2xl">
          {blog.title}
        </Text>
        <Text>{blog.description}</Text>
        <Text fontSize="sm" color="gray.500" mb={4}>
          By {blog.authorName} · {blog.date} · {blog.readTime}
        </Text>
      </VStack>
    </Container>
  );
};

export default Blog;
