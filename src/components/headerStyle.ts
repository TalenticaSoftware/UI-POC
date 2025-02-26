
import { ReactElement } from "react";

export const headerStyles = {
  header: {
    as: "header" as React.ElementType, 
    bg: "black.200",
    color: "white",
    py: 4,
  },
  flexContainer: {
    as: "nav" as React.ElementType, 
    align: "center",
    justify: "space-between",
    maxW: "container.xl",
    mx: "auto",
    px: 4,
    gap: 4,
  },
  navLink: (isActive: boolean) => ({
    fontSize: "lg",
    color: isActive ? "white" : "red.50",
    fontWeight: isActive ? "bold" : "normal",
    _hover: { textDecoration: "none" },
    _activeLink: { color: "yellow.300", fontWeight: "bold" },
  }),
  logoImage: {
    height: "50px",
    objectFit: "contain",
  },
  avatar: {
    size: "sm",
    cursor: "pointer",
  },
};
