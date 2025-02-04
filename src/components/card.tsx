import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Avatar,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface BlogPostProps {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  readTime: string;
}

export default function BlogPostWithImage({
  id,
  imageUrl,
  category,
  title,
  description,
  authorName,
  authorAvatar,
  date,
  readTime,
}: BlogPostProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <Card
      as="button"
      onClick={handleClick}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
    >
      <Image src={imageUrl} alt={title} objectFit="cover" h="210px" w="full" />

      <CardBody>
        <CardHeader p={0} mb={3}>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {category}
          </Text>
          <Heading
            fontSize={"2xl"}
            color={useColorModeValue("gray.700", "white")}
            noOfLines={1}
          >
            {title}
          </Heading>
        </CardHeader>
        <Text color={"gray.500"} noOfLines={3}>
          {description}
        </Text>
      </CardBody>

      <CardFooter>
        <Stack direction={"row"} spacing={4} align={"center"}>
          <Avatar src={authorAvatar} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{authorName}</Text>
            <Text color={"gray.500"}>
              {date} · {readTime}
            </Text>
          </Stack>
        </Stack>
      </CardFooter>
    </Card>
  );
}
