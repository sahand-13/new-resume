'use client';
import PropTypes from 'prop-types';
import { LazyMotion, domAnimation } from 'framer-motion';

// ----------------------------------------------------------------------

// eslint-disable-next-line import/extensions
// const loadFeatures = () => import('./features.js').then((res) => res.default);

MotionLazyContainer.propTypes = {
  children: PropTypes.node,
};

export default function MotionLazyContainer({ children }) {
  return (
    <LazyMotion strict features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
