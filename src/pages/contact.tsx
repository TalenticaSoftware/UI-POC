import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import ContactForm from "../components/forms/signInForm.tsx";

const Contact: React.FC = () => {
  return (
    <Container maxW="container.md">
      <VStack textAlign="center">
        <ContactForm />
      </VStack>
    </Container>
  );
};

export default Contact;
