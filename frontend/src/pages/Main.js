import { Box, Button, Card, Container, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { convertToAccountingFormat } from '../utils/NumberFormatter';
import axios from 'axios';
import Web3 from 'web3';
import COMMON_ABI from '../common/ABI';
import COMMON_HEADER from '../common/HeaderType';
import COMMON_CONTRACT from '../common/SaleInfoGetter';
import { onResponse } from '../common/ErrorMessage';
import Page from '../components/Page';

// 이미지 스타일
const ImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute'
});

/**
 * [메인 화면]
 */
const Main = () => {
  // [변수] 아이템, 작품명, 즉시 구매가, 심볼, 토큰 ID, 작품 존재 유무
  const [item, setItem] = useState('');
  const [artName, setArtName] = useState('최근 작품');
  const [artPrice, setArtPrice] = useState('0');
  const symbol = 'SSF';
  const [tokenId, setTokenId] = useState('');
  const [isCollection, setIsCollection] = useState(false);

  // Web3
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  /**
   * [초기 데이터 설정]
   * 화면 첫 렌더링시 최근 작품을 조회하는 함수를 호출합니다.
   */
  useEffect(() => {
    getItem();
  }, []);

  /**
   * PJT Ⅲ - 과제 4: 조회
   * Req. 4-F3 최근 작품 조회  
   * 
   * 1. API를 호출하고 응답 데이터를 화면에 표시합니다.
   * 2. 응답으로부터 받은 token_id로 NFT 컨트랙트를 직접 호출(tokenURI() 함수)하여 이미지를 화면에 보여주어야 합니다. 
   * 3. token_id를 이용해 얻은 sale_contract_address로 가지고 생성된 Sale 컨트랙트를 호출하여 즉시 구매 가격을 확인합니다. 
   */
  const getItem = async () => {
    // TODO
    setIsCollection(true);
    setTokenId(0);
    setItem("https://edu.ssafy.com/asset/images/logo.png");
    setArtName("fake title");
    setArtPrice("fake price");
  };

  return (
    <Page title="SSAFY NFT" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
      <Container>
        <Stack direction="row" justifyContent="center">
          <Box width="60%" sx={{ mt: 10, mr: 20 }}>
            <Typography variant="h2" sx={{ pb: 10 }}>
              블록체인과 NFT로
              <br />
              노력에 가치를 부여하세요.
            </Typography>
            <Stack spacing={{ xs: 0.5, sm: 4.5 }}>
              <Button
                fullWidth
                to="/items"
                variant="contained"
                size="large"
                sx={{ fontSize: 18 }}
                component={RouterLink}
              >
                구매하기
              </Button>
              <Button
                fullWidth
                to="/register"
                variant="contained"
                size="large"
                sx={{ fontSize: 18 }}
                component={RouterLink}
              >
                등록하기
              </Button>
            </Stack>
          </Box>

          <Box width="40%" textAlign="center">
            <Card sx={{ mb: 5 }}>
              <Box sx={{ ml: 25, mr: 25, pt: '100%', position: 'relative' }} />
              <ImgStyle src={item.length !== 0 ? item : null} />
            </Card>
            <Stack>
              {isCollection === true ? (
                <Link
                  to={`/items/buy/${tokenId}`}
                  color="inherit"
                  underline="hover"
                  component={RouterLink}
                >
                  <Typography variant="h4" noWrap>
                    {artName}
                  </Typography>
                </Link>
              ) : (
                <Typography variant="h4" noWrap>
                  {artName}
                </Typography>
              )}
              <Typography variant="h6">
                즉시 구매가 {convertToAccountingFormat(artPrice)} {symbol}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Page>
  );
};

export default Main;
