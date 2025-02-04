import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import SignInForm from "../components/forms/signInForm.tsx";

const Contact: React.FC = () => {
  return (
    <Container maxW="container.md">
      <VStack textAlign="center">
        <SignInForm />
      </VStack>
    </Container>
  );
};

export default Contact;
