"use client";
import PropTypes from "prop-types";
import DashboardLayout from "./dashboard";
import { Container } from "@mui/material";
import Particle from "../components/Particles/Particle";
// import LogoOnlyLayout from './LogoOnlyLayout';

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["dashboard", "main", "logoOnly"]),
};

export default function Layout({ variant = "dashboard", children }) {
  return (
    // <Particle>
    <DashboardLayout>{children}</DashboardLayout>
    // </Particle>
  );
}
