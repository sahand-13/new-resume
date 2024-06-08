// @mui
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
// components
import Iconify from "../../components/Iconify";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useArrayRef from "../../hooks/useArrayRef";

const CARDS = [
  {
    icon: "skill-icons:visualstudio-dark",
    title: ".Net",
    description:
      "I possess extensive experience with code-first database development using EF Core ORM in clean architecture projects. I have a strong understanding of SOLID and CQRS design patterns, and I have successfully implemented SignalR for real-time communications and Quartz for scheduling tasks, among other advanced technologies.",
  },
  {
    icon: "skill-icons:react-dark",
    title: "React JS",
    description:
      "Developed a fully dynamic web CMMS application using React.js, along with several other websites. Created dynamic components for the entire application and developed custom hooks, demonstrating expertise in React hooks. Experienced with state management using Redux, Redux Toolkit, and Redux Saga, among other advanced front-end technologies.",
  },
  {
    icon: "cib:next-js",
    title: "Next.js",
    description:
      "Skilled in developing server-side rendered applications, ensuring optimal performance and SEO.",
  },
];

const shadowIcon = (color) => `drop-shadow(0px 19px 17px ${alpha(color, 0.3)})`;

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 0, 20),
  borderRadius: "10px",
  [theme.breakpoints.up("md")]: {},
}));

// ----------------------------------------------------------------------

export default function SkillCards() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const ImageRef = useRef([]);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(useGSAP);
  useEffect(() => {
    ImageRef.current.forEach((item) => {
      const reaveal = gsap.timeline({
        scrollTrigger: {
          trigger: item.ref,
          start: "top 120%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
      reaveal.fromTo(item.ref, { scale: 0 }, { scale: 1 });
    });
  }, []);
  return (
    <RootStyle>
      <Container>
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
          <Typography
            component="div"
            variant="overline"
            sx={{ mb: 2, color: "text.disabled" }}
          >
            Experiences
          </Typography>
          <Typography variant="h2">About my experiences </Typography>
        </Box>

        <Box sx={{ display: "block" }}>
          {CARDS.map((card, index) => (
            <Card
              ref={(ref) => ImageRef.current.push({ index, ref })}
              sx={{ width: "90%", my: 3, mx: "auto" }}
            >
              <CardContent>
                <Stack
                  width={1}
                  direction={{ xs: "column", md: "row" }}
                  spacing={3}
                  alignItems={"center"}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Iconify
                      icon={card.icon}
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        width: 100,
                        height: 100,
                      }}
                    />
                    <Typography variant="h5" paragraph>
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography
                    component={"div"}
                    sx={{
                      color: isLight ? "text.secondary" : "common.white",
                      textIndent: "15px",
                    }}
                  >
                    <LetterComponent text={card.description} />
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
const LetterComponent = ({ text }) => {
  const [letterRef, setLetterRef] = useArrayRef();
  const parentRef = useRef();
  useEffect(() => {
    const reaveal = gsap.timeline({
      scrollTrigger: {
        trigger: letterRef.current,
        start: "top 70%",
        end: "bottom 40%",
        scrub: 1,
      },
    });
    reaveal.fromTo(
      letterRef.current,
      { duration: 3, opacity: 0, x: 700, WebkitTextFillColor: "transparent" },
      { duration: 3, opacity: 1, x: 0, WebkitTextFillColor: "unset" }
    );

    return () => {
      reaveal.kill;
    };
  }, []);

  return (
    <p ref={parentRef}>
      {text.split("").map((letter, index) => {
        debugger;
        return (
          <span
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            key={index}
            ref={setLetterRef}
          >
            {letter}
          </span>
        );
      })}
    </p>
  );
};
