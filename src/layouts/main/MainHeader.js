"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const links = [["About", "#about"], ["Work", "#work"], ["Skills", "#skills"]];

export default function MainHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 42));

  return <AppBar position="fixed" elevation={0} sx={{ background: scrolled ? "rgba(16, 28, 24, .9)" : "transparent", color: "#f8f4ea", pt: scrolled ? .35 : 1, transition: "background .3s ease, padding .3s ease", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(197,160,90,.18)" : "1px solid transparent" }}>
    <Toolbar sx={{ width: "min(1180px, calc(100% - 48px))", minHeight: "68px !important", mx: "auto", px: "0 !important", justifyContent: "space-between" }}>
      <Typography component="a" href="#home" aria-label="Sahand Golkar home" sx={{ color: "inherit", textDecoration: "none", fontWeight: "800 !important", letterSpacing: "-.05em", fontSize: "1.25rem !important" }}>SG<span style={{ color: "#c5a05a" }}>.</span></Typography>
      <Box component="nav" aria-label="Primary navigation" sx={{ display: { xs: "none", sm: "flex" }, gap: { sm: 2, md: 3.5 } }}>
        {links.map(([label, href]) => <motion.a key={href} href={href} whileHover={{ y: -2 }} style={{ color: "inherit", textDecoration: "none", fontSize: ".76rem", letterSpacing: ".08em", fontWeight: 700 }}>{label}</motion.a>)}
      </Box>
      <Button href="#contact" sx={{ color: "#17221d", background: "#c5a05a", fontWeight: 800, borderRadius: 0, px: { xs: 1.5, sm: 2 }, "&:hover": { background: "#e1c283" } }}>Contact</Button>
    </Toolbar>
  </AppBar>;
}
