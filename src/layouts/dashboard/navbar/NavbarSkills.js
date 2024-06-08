import {
  Box,
  Divider,
  LinearProgress,
  Stack,
  Typography,
  Zoom,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Iconify from "../../../components/Iconify";

const NavbarSkills = () => {
  const skills = [
    {
      type: "language",
      childs: [
        { name: "HTML", rate: 100, icon: "skill-icons:html" },
        { name: "CSS", rate: 100, icon: "skill-icons:css" },
        { name: "Typescript", rate: 90, icon: "skill-icons:typescript" },
        { name: "Javascript", rate: 100, icon: "skill-icons:javascript" },
        { name: "C#", rate: 100, icon: "devicon:csharp" },
      ],
    },
    {
      type: "frameworks",
      childs: [
        { name: ".Net", rate: 100, icon: "skill-icons:dotnet" },
        { name: "Next js", rate: 100, icon: "logos:nextjs-icon" },
        { name: "React js", rate: 100, icon: "vscode-icons:file-type-reactjs" },
        { name: "React native", rate: 100, icon: "tabler:brand-react-native" },
      ],
    },
    {
      type: "third party",
      childs: [
        { name: "MUI", rate: 100, icon: "simple-icons:mui" },
        { name: "Bootstrap", rate: 100, icon: "skill-icons:bootstrap" },
        { name: "Tailwind", rate: 100, icon: "skill-icons:tailwindcss-light" },
        { name: "Redux", rate: 100, icon: "skill-icons:redux" },
        { name: "Redux-saga", rate: 100, icon: "logos:redux-saga" },
        { name: "Redis", rate: 100, icon: "skill-icons:redis-dark" },
        { name: "gRPC", rate: 95, icon: "devicon:grpc" },
        { name: "WebSocket", rate: 100, icon: "logos:websocket" },
        { name: "OOP", rate: 100, icon: "ic:outline-data-object" },
      ],
    },
    {
      type: "other",
      childs: [
        { name: "Nginx", rate: 90, icon: "skill-icons:nginx" },
        { name: "Docker", rate: 100, icon: "skill-icons:docker" },
        { name: "Ubuntu", rate: 70, icon: "skill-icons:linux-light" },
        { name: "git", rate: 70, icon: "skill-icons:git" },
        { name: "Gitlab", rate: 70, icon: "skill-icons:gitlab-light" },
      ],
    },
  ];
  return (
    <Stack
      direction={"column"}
      spacing={3}
      p={1}
      py={3}
      alignItems={"center"}
      width={1}
      zIndex={-1}

      //   sx={{
      //     display: "flex",
      //     justifyContent: "space-evenly",
      //     alignItems: "center",
      //     gap: 2,
      //   }}
    >
      {skills?.length &&
        skills.map((item) => (
          <>
            <Typography
              variant="overline"
              sx={{
                borderRadius: "5px",
                p: 1,
                textAlign: "center",
                width: 1,
                bgcolor: (theme) => theme.palette.primary.main,
                color: "black",
              }}
            >
              {item?.type}{" "}
            </Typography>
            {item?.childs?.length &&
              item?.childs.map((child, index) => (
                <LinearProgressWithLabel
                  value={child.rate}
                  text={child?.name}
                  icon={child?.icon}
                  index={index + 1}
                />
              ))}
            <Divider sx={{ p: 1, width: 1 }} />
          </>
        ))}
      {/* <LinearProgressWithLabel value={100} text={"Persian"} />
      <LinearProgressWithLabel value={80} text={"English"} /> */}
    </Stack>
  );
};
function LinearProgressWithLabel({ value, text, icon, index }) {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setShow(false);
  //   }, 100 * index);
  // }, []);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100 * index);
  }, []);
  return (
    <Zoom in={show}>
      <Box sx={{ width: 1 }}>
        <Box
          sx={{
            width: 1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            p: 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>{text}</Box>
          <Typography
            fontSize={"12px"}
            variant="overline"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            {icon && (
              <Iconify
                icon={icon}
                width={20}
                height={20}
                color={theme.palette.primary.main}
              />
            )}
          </Typography>
          {/* <Typography
          fontSize={"12px"}
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {`${Math.round(value)}%`}
        </Typography> */}
        </Box>
        {/* <LinearProgress size={"5rem"} variant="determinate" value={value} /> */}
      </Box>
    </Zoom>
  );
}
export default NavbarSkills;
