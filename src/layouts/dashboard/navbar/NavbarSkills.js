import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Iconify from "../../../components/Iconify";

const groups = [
  {
    label: "CORE",
    skills: [
      ["C# / .NET", "devicon:csharp"],
      ["React", "skill-icons:react-dark"],
      ["Next.js", "cib:next-js"],
      ["TypeScript", "skill-icons:typescript"],
    ],
  },
  {
    label: "SYSTEMS",
    skills: [
      ["Microservices", "solar:layers-minimalistic-linear"],
      ["gRPC", "devicon:grpc"],
      ["Docker", "skill-icons:docker"],
      ["PostgreSQL", "devicon:postgresql"],
    ],
  },
  {
    label: "DELIVERY",
    skills: [
      ["GitLab CI/CD", "skill-icons:gitlab-light"],
      ["Redis", "skill-icons:redis-dark"],
      ["SignalR", "solar:chat-round-line-linear"],
      ["Prometheus", "devicon:prometheus"],
    ],
  },
];

export default function NavbarSkills() {
  return (
    <Stack spacing={2} sx={{ px: 1, pb: 1 }}>
      {groups.map((group) => (
        <Box key={group.label}>
          <Typography
            sx={{
              color: "#849188",
              fontSize: ".58rem",
              letterSpacing: ".16em",
              fontWeight: 800,
              mb: 0.85,
            }}
          >
            {group.label}
          </Typography>
          <Box
            sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0.65 }}
          >
            {group.skills.map(([label, icon], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -2 }}
              >
                <Box
                  sx={{
                    height: 58,
                    px: 0.75,
                    py: 0.65,
                    borderRadius: 1.5,
                    border: "1px solid rgba(197,160,90,.13)",
                    background: "rgba(255,255,255,.035)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    "&:hover": {
                      background: "rgba(197,160,90,.13)",
                      borderColor: "rgba(197,160,90,.38)",
                    },
                  }}
                >
                  <Iconify
                    icon={icon}
                    width={16}
                    height={16}
                    sx={{ color: "#c5a05a" }}
                  />
                  <Typography
                    sx={{
                      color: "#d8ddd6",
                      fontSize: ".62rem",
                      lineHeight: 1.05,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
