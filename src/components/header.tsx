import { Box, Flex, Link, Image, Avatar, HStack } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  const flexProps = {
    as: "nav" as React.ElementType,
    align: "center",
    justify: "space-between",
    maxW: "container.xl",
    mx: "auto",
    px: 4,
    gap: 4,
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

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
          {navLinks.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                as={RouterLink}
                to={path}
                fontSize="lg"
                color={isActive ? "white" : "red.50"}
                fontWeight={isActive ? "bold" : "normal"}
                textDecoration={isActive ? "underline" : "none"}
                _hover={{ color: "white", textDecoration: "underline" }}
                _activeLink={{ color: "yellow.300", fontWeight: "bold" }}
                aria-current={isActive ? "page" : undefined}
              >
                {name}
              </Link>
            );
          })}
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
