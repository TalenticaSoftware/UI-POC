// src/components/Footer.tsx
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="gray.100" py={4} textAlign="center">
      <Text fontSize="sm" color="gray.500">
        &copy; {new Date().getFullYear()} My Website. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
