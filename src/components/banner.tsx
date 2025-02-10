import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import BannerBg from "../assets/images/new-banner-img.png";

const Banner: React.FC = () => {
  return (
    <Box position="relative" boxShadow="lg" overflow="hidden">
      <Image
        src={BannerBg}
        alt="Banner"
        objectFit="cover"
        width="100%"
        height={{ base: "200px", md: "400px" }}
        loading="lazy"
      />

      <VStack
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        p={4}
        textAlign="center"
        color="white"
        spacing={4}
        maxW="80%"
      >
        <Heading size="lg" fontSize={{ base: "2xl", md: "4xl" }}>
          Banner Heading
        </Heading>
        <Text fontSize={{ base: "sm", md: "lg" }}>
          Discover amazing features and services.
        </Text>
        <Button
          bg={useColorModeValue("#151f21", "gray.900")}
          size="lg"
          as={RouterLink}
          to="/about"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          About Us
        </Button>
      </VStack>
    </Box>
  );
};

export default Banner;
