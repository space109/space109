import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MotionContainer, varBounceIn } from '../components/animate';
import axios from 'axios';
import Web3 from 'web3';
import COMMON_ABI from '../common/ABI';
import COMMON_HEADER from '../common/HeaderType';
import getSaleByTokenId from '../common/SaleInfoGetter';
import { onResponse } from '../common/ErrorMessage';
import Page from '../components/Page';
import ItemsList from '../layouts/items/ItemsList';

/**
 * [구매하기] 화면
 */
const Items = () => {
  // [변수] 아이템, 컬렉션 유무, 로딩
  const [item, setItem] = useState([]);
  const [isCollection, setIsCollection] = useState(false);
  const [loading, setLoading] = useState(false);

  // Web3
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  /**
   * [초기 데이터 설정]
   * 화면 첫 렌더링시 판매중인 작품을 조회하는 함수를 호출합니다.
   */
  useEffect(() => {
    getItem();
  }, []);


  /**
   * PJT Ⅲ - 과제 4: 조회
   * Req.4-F1 구매하기 화면 조회
   * 
   * 1. 구매하기 클릭 시 판매 작품을 조회 API를 호출합니다.  
   * 2. 응답으로부터 받은 token id로 Sale 정보를 요청합니다.
   * 3. sale 컨트랙트 주소로 즉시 구매가를 컨트랙트로부터 직접 조회합니다.
   * 3. token id로 NFT 컨트랙트로부터 직접 tokenURI를 조회하여 화면에 표시합니다. 
   */
  const getItem = async () => {
    // TODO 
    setLoading(true);
    
    const resultList = [];
    const resultItem = {
      id: 1,
      image: "https://edu.ssafy.com/asset/images/logo.png",
      hash: "fake hash",
      price: "fake price",
      title: "fake title"
    };
    resultList.push(resultItem);
    setItem(resultList);
    setLoading(false);
    setIsCollection(true);
  };

  // 카드 화면 생성을 위한 데이터 전달
  const products = [...Array(item.length)].map((_, index) => {
    return {
      image: item[index].image,
      title: item[index].title,
      tokenId: item[index].id,
      price: item[index].price,
      hash: item[index].hash
    };
  });

  return (
    <Page title="SSAFY NFT" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
      {loading === false ? (
        <>
          {isCollection === true ? (
            <Container maxWidth="xl">
              <ItemsList sx={{ mt: 1 }} products={products} />
            </Container>
          ) : (
            <Container>
              <MotionContainer initial="initial" sx={{ mt: 10 }} open>
                <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                  <motion.div variants={varBounceIn}>
                    <Typography variant="h3" paragraph>
                      검색 결과 없음
                    </Typography>
                  </motion.div>
                  <Typography sx={{ color: 'text.secondary' }}>
                    판매되고 있는 아이템이 없습니다.
                  </Typography>

                  <motion.div variants={varBounceIn}>
                    <Box
                      component="img"
                      src="/static/illustrations/illustration_register.png"
                      sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                    />
                  </motion.div>
                </Box>
              </MotionContainer>
            </Container>
          )}
        </>
      ) : (
        <Container>
          <MotionContainer initial="initial" sx={{ mt: 10 }} open>
            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
              <motion.div variants={varBounceIn}>
                <Typography variant="h3" paragraph>
                  아이템 로딩중...
                </Typography>
              </motion.div>
              <Typography sx={{ color: 'text.secondary' }}>
                판매되고 있는 아이템을 검색하고 있습니다.
              </Typography>

              <motion.div variants={varBounceIn}>
                <Box
                  component="img"
                  src="/static/illustrations/illustration_register.png"
                  sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                />
              </motion.div>
            </Box>
          </MotionContainer>
        </Container>
      )}
    </Page>
  );
};

export default Items;
