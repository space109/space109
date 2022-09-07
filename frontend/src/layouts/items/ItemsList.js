import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import ItemsCard from './ItemsCard';

ItemsCard.propTypes = {
  products: PropTypes.array
};

// 구매하기 카드 리스트 형태
export default function ItemsList({ products, ...other }) {
  return (
    <Grid container spacing={6} {...other}>
      {products.map((product) => (
        <Grid sx={{ mb: 5 }} key={product.hash} item xs={12} sm={6} md={3}>
          <ItemsCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
