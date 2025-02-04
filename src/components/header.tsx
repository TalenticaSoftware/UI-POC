// src/components/Header.tsx
import { Box, Flex, Link, Image, Avatar, HStack } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Header: React.FC = () => {
  const flexProps = {
    as: "nav" as React.ElementType,
    align: "center",
    justify: "space-between",
    maxW: "container.xl",
    mx: "auto",
    px: 4,
    gap: 4,
  };

  return (
    <Box as="header" bg="red.200" color="white" py={4}>
      <Flex {...flexProps}>
        <HStack spacing={4}>
          <Link as={RouterLink} to="/">
            <Image
              src="https://www.talentica.com/wp-content/uploads/2021/09/Talentica-white-Logo.svg"
              alt="Brand Logo"
              height="50px"
              objectFit="contain"
            />
          </Link>
        </HStack>

        <HStack spacing={8} flexGrow={1} justify="start">
          <Link as={RouterLink} to="/" fontSize="lg" color="red.50">
            Home
          </Link>
          <Link as={RouterLink} to="/about" fontSize="lg">
            About
          </Link>
          <Link as={RouterLink} to="/contact" fontSize="lg">
            Contact
          </Link>
        </HStack>

        <Avatar
          name="User Name"
          src="https://bit.ly/dan-abramov"
          size="sm"
          cursor="pointer"
        />
      </Flex>
    </Box>
  );
};

export default Header;
