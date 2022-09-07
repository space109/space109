import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { LoadingButton } from '@mui/lab';
import { MotionContainer, varBounceIn } from '../components/animate';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';
import COMMON_ABI from '../common/ABI';
import COMMON_HEADER from '../common/HeaderType';
import { onResponse, onContractCall } from '../common/ErrorMessage';
import getAddressFrom from '../utils/AddressExtractor';
import sendTransaction from '../utils/TxSender';
import Page from '../components/Page';

/**
 * [등록하기]를 위한 UI와 기능
 */
const ItemRegistration = () => {
  // [변수] 아이템 (파일, 이름, input 클릭 참조), 작가명, 제목, 아이템 소개, 토큰 ID
  const [item, setItem] = useState('');
  const [itemName, setItemName] = useState('');
  const itemSelect = useRef();
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tokenId, setTokenId] = useState('');

  // [변수] 등록 승인 모달 (모달, 개인키, 등록 로딩, 완료 여부)
  const [approveModal, setApproveModal] = useState(false);
  const [privKey, setPrivKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Web3
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  // 타이핑 헬퍼
  const typeSchema = Yup.object().shape({
    author: Yup.string().required('작가명을 입력해주세요.'),
    title: Yup.string().required('제목을 입력해주세요.')
  });

  // 입력 데이터 처리
  const formik = useFormik({
    initialValues: {
      author: '',
      title: '',
      description: ''
    },
    validationSchema: typeSchema,
    onSubmit: (value) => {
      setAuthor(value.author);
      setTitle(value.title);
      setDescription(value.description);
    }
  });
  const { errors, touched, handleSubmit, handleReset, getFieldProps } = formik;

  // 찾기 버튼 클릭 핸들링
  const handleClick = () => {
    itemSelect.current.click();
  };

  // 아이템 업로드 핸들링
  const handleItem = (value) => {
    setItem(value);

    if (value !== '') setItemName(value.name);
    else setItemName('');
  };

  // 모달 핸들링 (등록 승인)
  const toggleApprove = () => {
    setApproveModal(!approveModal);
  };

  // 개인키 입력 핸들링
  const handlePrivKey = (e) => {
    setPrivKey(e.target.value);
  };

  /**
   * PJT Ⅱ - 과제 1: 작품 등록 및 NFT 생성 
   * Req.1-F1 작품 등록 화면 및 등록 요청 
   * 
   * 구현 예)
   * 1. 업로드할 디지털 작품 및 모든 정보가 입력되면 등록 승인(개인키 입력)을 위한 모달창이 열립니다.
   * 2. 해당 모달 창에서 개인키를 입력하면 getAddressFrom() 함수를 통해 공개키가 반환되며, 공개키가 유효한 경우 작가명, 제목,
   * 아이템 소개 정보가 유지됩니다.
   * 3. 선택된 디지털 작품을 IPFS에 업로드합니다. 
   * 4. 업로드 완료 후 얻은 정보로 디지털 작품의 메타데이터(Metadata)를 구성하여 IPFS에 업로드합니다.  
   * 5. 메타데이터 업로드 완료 후 얻은 정보를 tokenURI로 하여 NFT 생성을 위한 스마트 컨트랙트의 함수를 호출합니다.
   * 6. 정상적으로 트랜잭션이 완결된 후 token Id가 반환됩니다.
   * 7. 백엔드에 token Id와 owner_address를 포함한 정보를 등록 요청합니다.   
   */
  const addItem = async () => {
    // TODO
  };

  return (
    <Page title="SSAFY NFT" maxWidth="100%" minHeight="100%">
      {isComplete === false ? (
        <Container sx={{ pt: 3, pl: 10, pr: 10 }}>
          <Typography variant="h3" sx={{ pb: 6, pr: 10 }}>
            당신의 아이템을 등록하세요.
          </Typography>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit} onReset={handleReset}>
              <Stack spacing={3}>
                <Stack direction="row" alignItems="center">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    ref={itemSelect}
                    onChange={(e) =>
                      e.target.files.length !== 0 ? handleItem(e.target.files[0]) : handleItem('')
                    }
                    style={{ display: 'none' }}
                  />
                  <TextField
                    sx={{ width: '60%' }}
                    type="text"
                    label="아이템 (업로드 확장자 형식: png, jpeg, jpg, gif)"
                    value={itemName}
                    disabled
                  />
                  <Button
                    sx={{ ml: 5, fontSize: 18 }}
                    variant="contained"
                    size="large"
                    onClick={handleClick}
                  >
                    찾기
                  </Button>
                </Stack>
                <TextField
                  sx={{ width: '70%' }}
                  inputProps={{ maxLength: 20 }}
                  type="text"
                  label="작가명"
                  {...getFieldProps('author')}
                  error={Boolean(touched.author && errors.author)}
                  helperText={touched.author && errors.author}
                />
                <TextField
                  sx={{ width: '70%' }}
                  inputProps={{ maxLength: 140 }}
                  type="text"
                  label="제목"
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  sx={{ width: '70%' }}
                  inputProps={{ maxLength: 20 }}
                  type="text"
                  multiline
                  label="아이템 소개 (Option)"
                  {...getFieldProps('description')}
                />
              </Stack>

              <Divider sx={{ mt: 5, width: '70%' }} />

              <Stack alignItems="center">
                <Button
                  sx={{ mt: 5, width: '40%', fontSize: 18 }}
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={
                    Object.keys(touched).length && !Object.keys(errors).length && item.length !== 0
                      ? toggleApprove
                      : null
                  }
                >
                  등록
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
                        등록 승인하기
                      </Typography>
                    </Box>
                    <Divider sx={{ mt: 2 }} />
                    <FormikProvider value={formik}>
                      <Form
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                      >
                        <Box sx={{ mt: 4, ml: 3, mr: 3 }}>
                          <Stack direction="row" sx={{ mt: 3 }}>
                            <TextField
                              fullWidth
                              type="text"
                              label="개인키"
                              onChange={handlePrivKey}
                              value={privKey}
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
                              onClick={addItem}
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
          <MotionContainer initial="initial" sx={{ mt: 5 }} open>
            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
              <motion.div variants={varBounceIn}>
                <Typography variant="h3" paragraph>
                  아이템 등록이 완료되었습니다.
                </Typography>
              </motion.div>
              <Typography sx={{ color: 'text.secondary' }}>
                판매 등록을 이어서 하시려면 다음 페이지로 이동해주세요.
              </Typography>

              <motion.div variants={varBounceIn}>
                <Box
                  component="img"
                  src="/static/illustrations/illustration_login.png"
                  sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                />
              </motion.div>

              <Stack direction="row" justifyContent="space-between" sx={{ ml: 5, mr: 5 }}>
                <Button
                  to="/"
                  size="large"
                  color="inherit"
                  variant="contained"
                  component={RouterLink}
                  sx={{ fontSize: 16 }}
                >
                  그만하기
                </Button>
                <Button
                  to={`/register/sale/${tokenId}`}
                  size="large"
                  variant="contained"
                  component={RouterLink}
                >
                  다음 페이지로
                </Button>
              </Stack>
            </Box>
          </MotionContainer>
        </Container>
      )}
    </Page>
  );
};

export default ItemRegistration;
