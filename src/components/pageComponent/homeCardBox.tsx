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

//

// 1. Using the sx Prop (Theme-Aware Styling)
// This allows you to apply styles using Chakra's design tokens.

// <Container sx={{ display: "flex", justifyContent: "center" }} />
// 2. Using Inline Styles (style Prop)
// Directly passing an object with CSS styles.

// <Container style={{ display: "flex", justifyContent: "center" }} />
// ⚠️ Does not support theme-aware styling.
// 3. Using Chakra’s Props (Box, Flex, etc.)
// Chakra UI components accept styling props directly.

// <Box display="flex" justifyContent="center" />
// 4. Using External Style Objects

// Storing styles in a variable and passing it.
// const containerStyles = {
//   display: "flex",
//   justifyContent: "center",
// };

// <Container sx={containerStyles} />
// 5. Using CSS-in-JS (styled-components or @emotion/styled)
// Useful for complex styles or dynamic styling.

// import styled from "@emotion/styled";

// const StyledContainer = styled(Container)`
//   display: flex;
//   justify-content: center;
// `;

// <StyledContainer />

// 6. Using SCSS or CSS Files
// Traditional approach for larger projects.
// .container {
//   display: flex;
//   justify-content: center;
// }

// <Container className="container" />
