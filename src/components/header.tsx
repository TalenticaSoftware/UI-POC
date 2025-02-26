import { Box, Flex, Link, Image, Avatar, HStack } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { headerStyles } from "./headerStyle.ts";

const Header: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <Box {...headerStyles.header}>
      <Flex {...headerStyles.flexContainer}>
        <HStack spacing={4}>
          <Link as={RouterLink} to="/">
            <Image
              src="https://www.talentica.com/wp-content/uploads/2021/09/Talentica-white-Logo.svg"
              alt="Brand Logo"
              sx={headerStyles.logoImage}
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
                sx={headerStyles.navLink(isActive)}
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
          sx={headerStyles.avatar}
        />
      </Flex>
    </Box>
  );
};

export default Header;
