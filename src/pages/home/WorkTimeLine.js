import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

import Typography from "@mui/material/Typography";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  Zoom,
  useTheme,
} from "@mui/material";
import Image from "../../components/Image";
import eat from "../../assets/photos/eat.jpg";
import study from "../../assets/photos/study.jpg";
import code from "../../assets/photos/Coding.jpg";
import coffee from "../../assets/photos/coffee.jpg";
import sleep from "../../assets/photos/sleep.jpg";
import gym from "../../assets/photos/gym.jpg";

import Iconify from "../../components/Iconify";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function WorkTimeLine() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(useGSAP);
  const theme = useTheme();
  const myRef = useRef(null);
  const ImageRef = useRef([]);
  useGSAP();
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

  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  const timeLineContent = [
    {
      title: "Eat",
      DS: { alt: "Eat", src: eat.src },
    },
    {
      title: "Gym",
      DS: { alt: "Gym", src: gym.src },
    },
    {
      title: "Study",
      DS: { alt: "Study", src: study.src },
    },
    {
      title: "Coffee",
      DS: { alt: "Coffee", src: coffee.src },
    },
    {
      title: "Code",
      DS: { alt: "Code", src: code.src },
    },
    {
      title: "Sleep",
      DS: { alt: "Sleep", src: sleep.src },
    },
  ];
  return (
    <Box
      sx={{
        display: "blcok",
        textAlign: "center",
        p: (theme) => theme.spacing(1),
      }}
    >
      <Typography
        ref={myRef}
        sx={{
          p: 3,
          width: 1,
          textAlign: "center",
          color: (theme) => theme.palette.primary.main,
        }}
        variant="overline"
      >
        My Life Style
      </Typography>
      <Timeline position="alternate">
        {timeLineContent?.length &&
          timeLineContent.map((item, index) => {
            return (
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  variant="body2"
                  color="text.secondary"
                  {...(index % 2 === 0 && { align: "right" })}
                  {...(Boolean(index + 1 === timeLineContent.length) && {
                    align: "bottom",
                  })}
                >
                  {item.title}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector
                    sx={{ bgcolor: (theme) => theme.palette.primary.main }}
                  />
                  <TimelineDot
                    sx={{ ...(item.DS.icon && { bgcolor: "inherit" }) }}
                  >
                    {item?.DS?.icon && (
                      <Iconify
                        icon={item.DS.icon}
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                        }}
                      />
                    )}
                  </TimelineDot>
                  <TimelineConnector
                    sx={{ bgcolor: (theme) => theme.palette.primary.main }}
                  />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  {item?.DS?.src && (
                    <Box
                      sx={{ width: 1 }}
                      ref={(ref) => ImageRef.current.push({ index, ref })}
                    >
                      <Image
                        ratio={"16/9"}
                        src={item.DS.src}
                        alt={item.DS.alt}
                        sx={{ borderRadius: "10px" }}
                      />
                    </Box>
                  )}
                </TimelineContent>
              </TimelineItem>
            );
          })}
      </Timeline>
    </Box>
  );
}
