import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    contact: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    contact: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Invalid email format",
      }));
    }

    if (name === "contact") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({ ...prev, contact: "Only numbers are allowed" }));
      } else if (value.length !== 10) {
        setErrors((prev) => ({
          ...prev,
          contact: "Contact must be exactly 10 digits",
        }));
      } else {
        setErrors((prev) => ({ ...prev, contact: "" }));
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = { email: "", contact: "" };

    if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format";
    if (formData.contact.length !== 10)
      newErrors.contact = "Contact must be exactly 10 digits";

    setErrors(newErrors);
    if (newErrors.email || newErrors.contact) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onOpen();
      toast({
        title: "Form Submitted",
        description: "Your details have been successfully submitted!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }, 2000);
  };

  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Contact Form</Heading>
          <Text fontSize="lg" color="gray.600">
            To enjoy all of our cool{" "}
            <Text as="span" color="blue.400">
              features
            </Text>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <Text color="red.500" fontSize="sm">
                    {errors.email}
                  </Text>
                )}
              </FormControl>

              <FormControl id="contact" isInvalid={!!errors.contact}>
                <FormLabel>Contact</FormLabel>
                <Input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  maxLength={10}
                  required
                />
                {errors.contact && (
                  <Text color="red.500" fontSize="sm">
                    {errors.contact}
                  </Text>
                )}
              </FormControl>

              <Stack spacing={10}>
                <Button variant="solid" type="submit" isDisabled={isSubmitting}>
                  {isSubmitting ? <Spinner size="sm" /> : "Submit"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalBody>
            <Text>Your form has been successfully submitted!</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ContactForm;
