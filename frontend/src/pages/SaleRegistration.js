import * as Yup from 'yup';
import { LoadingButton, LocalizationProvider, MobileDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { MotionContainer, varBounceIn } from '../components/animate';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import getAddressFrom from '../utils/AddressExtractor';
import sendTransaction from '../utils/TxSender';
import COMMON_HEADER from '../common/HeaderType';
import COMMON_ABI from '../common/ABI';
import { onResponse, onContractCall } from '../common/ErrorMessage';
import moment from 'moment';
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
 * [판매 정보 등록]
 */
const SaleRegistration = () => {
  // [변수] 토큰 ID (URL 파라미터 사용)
  const tokenId = useLocation().pathname.substring(15);

  // [변수] 아이템, 심볼, 작가명, 소유자 주소, 제목, 아이템 소개, 판매 종료일, 즉시 구매가, 최소 제안가,
  //       타임스탬프 (현재 시점, 종료 시점), 컬렉션 판매 유무, 판매 완료 여부
  const [item, setItem] = useState('');
  const symbol = 'SSF';
  const [author, setAuthor] = useState('');
  const [authorAddr, setAuthorAdr] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('ko-KR'));
  const [price, setPrice] = useState('0');
  const [minPrice, setMinPrice] = useState('0');
  const [current, setCurrent] = useState('');
  const [due, setDue] = useState('');
  const [isSale, setIsSale] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // [변수] 판매 등록 모달 (모달, 개인키, 등록 로딩)
  const [approveModal, setApproveModal] = useState(false);
  const [privKey, setPrivKey] = useState('');
  const [loading, setLoading] = useState(false);

  // Web3
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));


  /**
   * [초기 데이터 설정]
   * 화면 첫 렌더링시 아이템의 정보를 조회합니다.
   */
  useEffect(() => {
    checkInfo();
  }, []);

  // 타이핑 헬퍼
  const typeSchema = Yup.object().shape({
    price: Yup.number().positive().integer().required(),
    minPrice: Yup.number().positive().integer().required()
  });

  // 입력 데이터 처리
  const formik = useFormik({
    initialValues: {
      price: '',
      minPrice: ''
    },
    validationSchema: typeSchema,
    onSubmit: (value) => {
      setPrice(value.price);
      setMinPrice(value.minPrice);
    }
  });
  const { errors, touched, handleSubmit, handleReset, getFieldProps } = formik;

  // 판매 종료일 선택 핸들링
  const handleDate = (value) => {
    setDate(value);
  };

  // 모달 핸들링 (판매 승인)
  const toggleApprove = () => {
    setApproveModal(!approveModal);
  };

  // 개인키 입력 핸들링
  const handlePrivKey = (e) => {
    setPrivKey(e.target.value);
  };

  /**
   * [판매 종료일 검증]
   * 현재 시간과 판매 종료일을 확인하여 당일이 아닌 경우에만 판매 등록 승인 모달창을 띄웁니다.
   * 판매 종료 시간은 해달 날짜의 자정(0시)으로 고정됩니다.
   * 필요에 따라 시간을 지정할 수 있도록 변경해도 괜찮습니다. 
   */
  const checkDate = () => {
    const now = parseInt((moment() / 1000).toFixed(0));
    const endDate = parseInt((moment(date) / 1000).toFixed(0));

    if (now > endDate) alert('당일은 판매 종료일로 설정할 수 없습니다.');
    else {
      setCurrent(now);
      setDue(endDate);
      toggleApprove();
    }
  };


  /**
   * PJT Ⅱ - 과제 2: 작품 조회
   * Req. 2-F3 작품 상세 조회
   * 
   * token id로 작품의 상세 정보를 조회합니다.
   * 작품의 tokenURI를 NFT로부터 직접 조회합니다.
   * 
   * PJT Ⅲ - 과제 2: 작품 판매 등록 
   * Req. 2-F3 작품 상세 화면 수정
   * 
   * 작품의 판매 등록 여부에 따라 sale 컨트랙트를 호출 할 수 있는 버튼
   * (제안하기, 구매하기)이 추가되어야 합니다. 
   * 
   */
  const checkInfo = async () => {
    // TODO
    setIsSale(false);
  };

  /**
   * PJT Ⅲ - 과제 2: 작품 판매 등록 
   * Req. 2-F2 Sale 컨트랙트 생성 
   * 
   * 1. 판매 등록 승인 모달창에 개인키를 입력하면 getAddressFrom() 함수를 이용해 공개키를 반환 받습니다.
   * 2. 공개키가 유효한 경우 Sale Factory 컨트랙트의 createSale() 함수를 호출하여 새로운 Sale 컨트랙트를 생성합니다.
   * 3. 컨트랙트 정상 호출 후 새로운 Sale 컨트랙트의 주소를 반환 받습니다.
   * 4. 생성된 Sale 컨트랙트가 판매자를 대신하여 NFT 소유권을 이전할 수 있도록 Sale에게 NFT를 전송합니다 (transferFrom())
   * 5. 위 과정이 모두 정상 수행되었다면 API를 호출하여 판매 정보를 등록합니다. 
   * 
   */
  const createSaleContract = async () => {
    // TODO     
    setLoading(false);
  };

  /**
   * PJT Ⅲ - 과제 2: 작품 판매 등록 
   * Req. 2-F1 판매 등록 화면 
   * Req. 2-F2 Sale 컨트랙트 생성 
   * 
   * 위 createSaleContract()에서
   * 정상 수행 후 반환되는 판매 정보를 API로 호출하여 업데이트합니다.
   */
  const registerSaleInfo = async (pubKey, saleCA) => {
    setLoading(false);
  };

  return (
    <Page title="SSAFY NFT" maxWidth="100%" minHeight="100%">
      {isComplete === false ? (
        <>
          {isSale === true ? (
            <Container sx={{ pt: 3, pl: 10, pr: 10 }}>
              <Typography variant="h3" sx={{ pb: 3, pr: 10 }}>
                판매 정보를 등록해주세요.
              </Typography>

              <Stack direction="row" sx={{ mt: 4 }}>
                <Stack width="30%">
                  <Card>
                    <Box sx={{ pt: '100%', position: 'relative' }}>
                      <ImgStyle src={item.length !== 0 ? item : null} />
                    </Box>
                  </Card>
                </Stack>

                <Stack sx={{ ml: 10 }} width="70%">
                  <Card>
                    <CardHeader sx={{ ml: 1, mb: 2 }} title="작품 정보" />
                    <Divider />
                    <CardContent sx={{ ml: 1, mr: 1, pt: 4 }}>
                      <Stack direction="row">
                        <Typography sx={{ fontSize: 18 }}> 작가명 : </Typography>
                        <Typography sx={{ ml: 1 }} variant="h6">
                          {author}
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ mt: 3 }}>
                        <Typography sx={{ fontSize: 18 }}> 제목 : </Typography>
                        <Typography sx={{ ml: 1 }} variant="h6">
                          {title}
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ mt: 3 }}>
                        <Typography sx={{ fontSize: 18 }}> 아이템 소개 : </Typography>
                        <Typography sx={{ ml: 1 }} variant="h6">
                          {description}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Stack>

              <Stack sx={{ mb: 7 }}></Stack>
              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit} onReset={handleReset}>
                  <Stack spacing={3}>
                    <Stack direction="row" alignItems="center">
                      <TextField
                        sx={{ width: '100%' }}
                        type="number"
                        label="즉시 구매가"
                        {...getFieldProps('price')}
                        error={Boolean(touched.price && errors.price)}
                      />
                      <Typography variant="h5" sx={{ pl: 2 }}>
                        {symbol}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                      <TextField
                        sx={{ width: '100%' }}
                        type="number"
                        label="최소 제안가"
                        {...getFieldProps('minPrice')}
                        error={Boolean(touched.minPrice && errors.minPrice)}
                      />
                      <Typography variant="h5" sx={{ pl: 2 }}>
                        {symbol}
                      </Typography>
                    </Stack>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                      <Stack sx={{ pt: 1 }}>
                        <MobileDatePicker
                          label="판매 종료일"
                          inputFormat="yyyy-MM-dd"
                          value={date}
                          disablePast
                          onChange={handleDate}
                          renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Stack>

                  <Divider sx={{ mt: 5, width: '100%' }} />

                  <Stack alignItems="flex-end">
                    <Button
                      sx={{ mt: 5, width: '40%', fontSize: 18 }}
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={
                        Object.keys(touched).length &&
                        !Object.keys(errors).length &&
                        item.length !== 0
                          ? checkDate
                          : null
                      }
                    >
                      판매 등록
                    </Button>

                    <Modal open={approveModal}>
                      <Card
                        sx={{
                          width: '40%',
                          border: 1,
                          borderRadius: 1,
                          borderColor: 'grey.main',
                          backgroundColor: '#ffffff',
                          top: '25%',
                          left: '30%'
                        }}
                      >
                        <Box>
                          <Typography sx={{ ml: 3, pt: 2 }} variant="h5">
                            판매 승인하기
                          </Typography>
                        </Box>
                        <Divider sx={{ mt: 2 }} />
                        <FormikProvider value={formik}>
                          <Form autoComplete="off" noValidate onSubmit={handleSubmit} onReset={handleReset}>
                            <Box sx={{ mt: 4, ml: 3, mr: 3 }}>
                              <Stack direction="row" sx={{ mt: 3 }}>
                                <TextField
                                  fullWidth
                                  type="text"
                                  label="개인키"
                                  onChange={handlePrivKey}
                                />
                              </Stack>
                              <Divider sx={{ mt: 4 }} />
                              <Stack direction="row" sx={{ mt: 3, mb: 3 }} justifyContent="center">
                                {loading === false ? (
                                  <Button
                                    size="large"
                                    variant="contained"
                                    sx={{ width: '20%', fontSize: 16 }}
                                    onClick={toggleApprove}
                                  >
                                    취소
                                  </Button>
                                ) : null}
                                <LoadingButton
                                  size="large"
                                  variant="contained"
                                  sx={{ ml: 3, width: '20%', fontSize: 16 }}
                                  loading={loading}
                                  onClick={createSaleContract}
                                >
                                  승인하기
                                </LoadingButton>
                              </Stack>
                            </Box>
                          </Form>
                        </FormikProvider>
                      </Card>
                    </Modal>
                  </Stack>
                </Form>
              </FormikProvider>
            </Container>
          ) : (
            <Container>
              <MotionContainer initial="initial" sx={{ mt: 10 }} open>
                <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                  <motion.div variants={varBounceIn}>
                    <Typography variant="h3" paragraph>
                      잘못된 접근입니다.
                    </Typography>
                  </motion.div>

                  <Typography sx={{ color: 'text.secondary' }}>
                    이미 판매되고 있는 아이템이거나 정보를 찾을 수 없습니다.
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
                  판매 등록 완료
                </Typography>
              </motion.div>
              <Typography sx={{ color: 'text.secondary' }}>판매 등록이 완료되었습니다.</Typography>

              <motion.div variants={varBounceIn}>
                <Box
                  component="img"
                  src="/static/illustrations/illustration_register.png"
                  sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                />
              </motion.div>

              <Button to="/" size="large" variant="contained" component={RouterLink}>
                홈으로 돌아가기
              </Button>
            </Box>
          </MotionContainer>
        </Container>
      )}
    </Page>
  );
};

export default SaleRegistration;
