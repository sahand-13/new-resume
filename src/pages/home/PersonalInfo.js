"use client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";
import Image from "../../components/Image";
import profile from "../../assets/profile/profile.jpg";
import useResponsive from "../../hooks/useResponsive";
import { IconButtonAnimate } from "../../components/animate";
import Iconify from "../../components/Iconify";

const PersonalInfo = () => {
  const isDesktop = useResponsive("up", "lg");
  const contactHandler = (link) => {
    window.open(link, "_blank");
  };
  return (
    <Card
      sx={{
        width: 1,
        bgcolor: (theme) => theme.palette.background.default,
        p: (theme) => theme.spacing(1),
      }}
    >
      <CardContent sx={{ display: "flex", gap: 1 }}>
        <Box sx={{ width: 1, p: 3, textAlign: "center" }}>
          <Zoom in={true}>
            <Typography variant="h3">I am</Typography>
          </Zoom>
          <br />
          <Typography
            variant="h1"
            sx={{
              textIndent: "10px",
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Sahand Golkar
          </Typography>
          <Divider sx={{ m: 3, px: 10 }} />

          <Stack
            textAlign={"start"}
            direction="column"
            justifyContent="space-around"
            alignItems="flex-start"
            p={(theme) => theme.spacing(1)}
            maxWidth={isDesktop ? "60%" : "100%"}
            sx={{ mx: "auto", my: 3 }}
          >
            <Typography
              variant="subtitle1"
              fontSize={"12px"}
              sx={{ textIndent: "10px", lineHeight: "18px" }}
            >
              I am a passionate Fullstack Developer with 4 years of professional
              experience in building robust, scalable, and user-friendly web and
              mobile applications. My expertise spans across front-end and
              back-end development, utilizing technologies such as .NET, React,
              Next.js, and React Native. <br />I thrive in dynamic environments
              where I can solve complex problems and contribute to the success
              of the projects I work on.
            </Typography>
          </Stack>
          <Divider sx={{ m: 3, px: 10 }} />
          <Stack direction="row" justifyContent={"center"} sx={{ width: 1 }}>
            <IconButtonAnimate
              onClick={() => contactHandler("https://github.com/sahand-13")}
            >
              <Iconify icon={"mdi:github"} />
            </IconButtonAnimate>
            <IconButtonAnimate
              onClick={() =>
                contactHandler(
                  "https://www.linkedin.com/in/sahand-golkar-8a79b5210"
                )
              }
            >
              <Iconify icon={"akar-icons:linkedinv1-fill"} />
            </IconButtonAnimate>
            <IconButtonAnimate
              onClick={() => contactHandler("mailto:golkar.sahand@gmail.com")}
            >
              <Iconify icon={"mdi:gmail"} />
            </IconButtonAnimate>
            <IconButtonAnimate>
              <Iconify
                icon={"ic:baseline-telegram"}
                onClick={() => contactHandler("https://t.me/A3aSiN1")}
              />
            </IconButtonAnimate>
            <IconButtonAnimate
              onClick={() =>
                contactHandler(
                  "//api.whatsapp.com/send?phone=+989359550274&text=Hi sahand"
                )
              }
            >
              <Iconify icon={"mingcute:whatsapp-fill"} />
            </IconButtonAnimate>
            <IconButtonAnimate
              onClick={() => contactHandler("tel:+989359550274")}
            >
              <Iconify icon={"solar:phone-line-duotone"} />
            </IconButtonAnimate>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
