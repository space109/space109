import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import ItemCard from './ItemCard';

ItemCard.propTypes = {
  products: PropTypes.array
};

// 후즈컬렉션 카드 리스트 형태
export default function ItemList({ products, ...other }) {
  return (
    <Grid container spacing={6} {...other}>
      {products.map((product) => (
        <Grid sx={{ mb: 5 }} key={product.hash} item xs={12} sm={6} md={2}>
          <ItemCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
