"use client";
import { Container, Typography, useTheme } from "@mui/material";
import WorkTimeLine from "../pages/home/WorkTimeLine";
import PersonalInfo from "../pages/home/PersonalInfo";
import SkillCards from "../pages/home/SkillCards";
export default function Home() {
  const theme = useTheme();

  return (
    <>
      <PersonalInfo />
      <SkillCards />
      <WorkTimeLine />
    </>
  );
}
