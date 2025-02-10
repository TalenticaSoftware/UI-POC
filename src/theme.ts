import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// Define the color mode configuration
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// const sizes = {
//     ...baseTheme.space,
//     max: "max-content",
//     min: "min-content",
//     full: "100%",
//     "3xs": "14rem",
//     "2xs": "16rem",
//     xs: "20rem",
//     sm: "24rem",
//     md: "28rem",
//     lg: "32rem",
//     xl: "36rem",
//     "2xl": "42rem",
//     "3xl": "48rem",
//     "4xl": "56rem",
//     "5xl": "64rem",
//     "6xl": "72rem",
//     "7xl": "80rem",
//     "8xl": "90rem",
//     container: {
//       sm: "640px",
//       md: "768px",
//       lg: "1024px",
//       xl: "1280px",
//     },
//   };

// Define custom theme colors, fonts, and component styles
const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
        lineHeight: "base",
      },
      a: {
        color: "brand.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    }),
    
  },
  colors: {
    brand: {
      50: '#e3f2f9',
      100: '#c5e4f3',
      200: '#a2d4ec',
      300: '#7ac1e4',
      400: '#47a9da',
      500: '#0088cc',
      600: '#007ab8',
      700: '#006ba1',
      800: '#005885',
      900: '#003f5e',
    },
    gray: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    },
    red: {
      200: 'black',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      sizes: {
        sm: {
          h: '32px',
          fontSize: 'sm',
          px: '16px',
        },
        md: {
          h: '40px',
          fontSize: 'md',
          px: '20px',
        },
        lg: {
          h: '48px',
          fontSize: 'lg',
          px: '24px',
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
        link: {
          color: 'brand.500',
          _hover: {
            textDecoration: 'underline',
          },
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'solid',
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderColor: 'gray.300',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px #0088cc',
          },
        },
      },
      sizes: {
        md: {
          field: {
            fontSize: 'md',
            px: 4,
            h: 10,
          },
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: 'gray.300',
            _hover: {
              borderColor: 'brand.500',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px #0088cc',
            },
          },
        },
        filled: {
          field: {
            bg: 'gray.100',
            _hover: {
              bg: 'gray.200',
            },
            _focus: {
              bg: 'white',
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px #0088cc',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
      },
    },
    Card: {
      baseStyle: {
        p: 4,
        borderWidth: '1px',
        borderRadius: 'md',
        boxShadow: 'md',
        bg: 'white',
        _hover: {
          boxShadow: 'lg',
        },
      },
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg: mode('white', 'gray.800')(props),
          color: mode('gray.800', 'whiteAlpha.900')(props),
          borderRadius: 'md',
          boxShadow: 'lg',
        },
      }),
    },
    Tabs: {
      baseStyle: {
        tab: {
          fontWeight: 'bold',
          _selected: {
            color: 'brand.500',
            borderColor: 'brand.500',
          },
        },
      },
      sizes: {
        md: {
          tab: {
            fontSize: 'md',
            py: 3,
            px: 4,
          },
        },
      },
      variants: {
        line: {
          tab: {
            borderBottom: '2px solid',
            borderColor: 'transparent',
            _hover: {
              borderColor: 'gray.300',
            },
            _selected: {
              borderColor: 'brand.500',
            },
          },
        },
        enclosed: {
          tab: {
            border: '1px solid',
            borderColor: 'gray.300',
            _hover: {
              bg: 'gray.50',
            },
            _selected: {
              bg: 'brand.50',
              color: 'brand.500',
              borderColor: 'brand.500',
            },
          },
        },
      },
    },
  },
});

export default theme;
