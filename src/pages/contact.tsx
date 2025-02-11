import { Container, VStack } from "@chakra-ui/react";
import React from "react";
import ContactForm from "../components/forms/signInForm.tsx";

const Contact: React.FC = () => {
  return (
    <Container
      maxW="container.md"
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100%"
    >
      <VStack textAlign="center" w={"full"}>
        <ContactForm />
      </VStack>
    </Container>
  );
};

export default Contact;
