import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import logo from '../image/logo.png';

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={logo} sx={{ width: 83, height: 62, ...sx }} />;
}
