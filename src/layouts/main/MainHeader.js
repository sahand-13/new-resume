// next
// import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
import Logo from '../../components/Logo';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import { useScrollDirection } from '../../hooks/useScrollingDetections';
import { varFade } from '../../components/animate';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

// const ToolbarShadowStyle = styled('div')(({ theme }) => ({
//   left: 0,
//   right: 0,
//   bottom: 0,
//   height: 24,
//   zIndex: -1,
//   margin: 'auto',
//   borderRadius: '50%',
//   position: 'absolute',
//   width: `calc(100% - 48px)`,
//   boxShadow: theme.customShadows.z8,
// }));

// ----------------------------------------------------------------------

export default function MainHeader({ index }) {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
  const scrollDirection = useScrollDirection();
  const theme = useTheme();

  const pathname = usePathname();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          boxShadow: 0,
          opacity: 0.9,
          ...(isOffset && {
            ...cssStyles(theme).bgBlur({
              color: theme.palette.common.black,
              blur: 0,
              opacity: 0.7,
            }),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Box
          sx={{
            mx: 2,
            width: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}

          <motion.div {...varFade().inLeft}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Logo />

              {isDesktop && (
                <Typography sx={{ mx: 1, color: 'primary.light', fontSize: '15px' }} variant="overline">
                  Hara
                </Typography>
              )}
            </Box>
          </motion.div>
          {scrollDirection === 'up' && isDesktop && (
            <motion.div {...varFade().inDown}>
              <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
            </motion.div>
          )}
          <motion.div {...varFade().inRight}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {isDesktop && (
                <Button
                  size="small"
                  variant="contained"
                  target="_blank"
                  rel="noopener"
                  href="https://material-ui.com/store/items/minimal-dashboard/"
                  sx={{
                    height: 30,
                    bgcolor: (theme) => theme.palette.primary.main,
                    color: 'common.black',
                  }}
                >
                  Login | Sign up
                </Button>
              )}
              {!isDesktop && (
                <IconButton size="small">
                  <Iconify icon={'lets-icons:user-duotone'} width={30} height={30} />
                </IconButton>
              )}
            </Box>
          </motion.div>
        </Box>
      </ToolbarStyle>

      {/* {isOffset && <ToolbarShadowStyle />} */}
    </AppBar>
  );
}
