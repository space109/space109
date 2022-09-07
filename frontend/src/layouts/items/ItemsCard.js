import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { convertToAccountingFormat } from '../../utils/NumberFormatter';

// 이미지 스타일
const ImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute'
});

ItemsCard.propTypes = {
  product: PropTypes.object
};

// 구매하기 카드 형태
export default function ItemsCard({ product }) {
  // 이미지, 제목, 가격, 토큰 ID, 심볼
  const { image, title, price, tokenId } = product;
  const symbol = 'SSF';

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ImgStyle src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={`/items/buy/${tokenId}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle1" noWrap>
            {title}
          </Typography>
        </Link>

        <Typography variant="subtitle1" textAlign="right" sx={{ fontSize: 25 }}>
          {convertToAccountingFormat(price)} {symbol}
        </Typography>
      </Stack>
    </Card>
  );
}
