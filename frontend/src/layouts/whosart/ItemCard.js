import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Typography, Stack, Button, Modal, Link, Divider, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import Label from '../../components/Label';
import axios from 'axios';
import Web3 from 'web3';
import COMMON_HEADER from '../../common/HeaderType';
import COMMON_ABI from '../../common/ABI';
import getByTokenId from '../../common/SaleInfoGetter';
import { onResponse, onContractCall, onInvalidAddress } from '../../common/ErrorMessage';
import sendTransaction from '../../utils/TxSender';
import getAddressFrom from '../../utils/AddressExtractor';

// 이미지 스타일
const ImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute'
});

ItemCard.propTypes = {
  product: PropTypes.object
};


/**
 * 작품의 개별 카드
s */
export default function ItemCard({ product }) {
  // [변수] 이미지, 제목, 판매 상태, 토큰 ID, 판매 종료 유무, 클릭 버튼명, 로딩
  const { image, title, onSale, tokenId, ended } = product;
  const [action, setAction] = useState('');
  const [loading, setLoading] = useState(false);

  // 판매 승인 모달
  const [approveModal, setApproveModal] = useState(false);

  // Web3
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  // 타이핑 헬퍼
  const typeSchema = Yup.object().shape({
    privKey: Yup.string().required('개인키를 입력해주세요.')
  });

  // 입력 데이터 처리
  const formik = useFormik({
    initialValues: {
      privKey: ''
    },
    validationSchema: typeSchema,
    onSubmit: (value) => {
      checkAddress(value.privKey);
    }
  });
  const { handleSubmit, handleReset, getFieldProps } = formik;

  // 모달 핸들링 (판매 승인)
  const toggleApprove = (act) => {
    setAction(act);
    setApproveModal(!approveModal);
  };
  
  /**
   * PJT Ⅲ - 과제 3: 거래 진행
   * Req.3-F3 취소하기
   * 
   * 컨트랙트 정상 호출 후 백엔드에 상태를 업데이트합니다. 
   * @param {*} id saleId  
   */
  const cancelItem = async (id) => {
    // TODO
    setLoading(false);
  };

  /**
   * PJT Ⅲ - 과제 3: 거래 진행
   * Req.3-F4 완료하기
   * 
   * 컨트랙트 정상 호출 후 백엔드에 상태를 업데이트합니다. 
   * 최종 구매자의 정보가 기록됩니다.
   * @param {*} pubKey 구매자 주소
   */
  const completeItem = async (pubKey) => {
    // TODO
    setLoading(false);
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {onSale && (
          <Label
            variant="filled"
            color={(onSale === '0' && 'secondary') || 'warning'}
            sx={{
              zIndex: 9,
              top: 16,
              left: 16,
              position: 'absolute'
            }}
          >
            {onSale === '0' ? '보유' : '판매중'}
          </Label>
        )}
        <ImgStyle src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={`/items/buy/${tokenId}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography sx={{ mb: 1 }} variant="subtitle1" noWrap>
            {title}
          </Typography>
        </Link>
        {/**
         * PJT Ⅲ - 과제 3: 거래 진행  
         * Req. 3-F5 판매하기
         * 
         * 판매 중이 아닌 상품을 새롭게 판매 등록할 수 있습니다.
         */}
        {onSale === '0' ? (
          <Button to={`/register/sale/${tokenId}`} variant="contained" component={RouterLink}>
            판매하기
          </Button>
        ) : (
          <>
          {/*
            * PJT Ⅲ - 과제 2: 거래 진행  
            * WhosArt.js 요청 후 전달 받은 [종료 여부]에 따라 버튼을 추가합니다.  
            */}
            {ended === false ? (
              <>
                <Button variant="contained" onClick={() => toggleApprove('cancel')}>
                  취소하기
                </Button>
                <Button color="inherit" variant="contained">
                  완료하기
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" variant="contained">
                  취소하기
                </Button>
                <Button variant="contained" onClick={() => toggleApprove('complete')}>
                  완료하기
                </Button>
              </>
            )}
          </>
        )}

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
                판매 {action === 'cancel' ? '취소' : '완료'}하기
              </Typography>
            </Box>
            <Divider sx={{ mt: 2 }} />
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit} onReset={handleReset}>
                <Box sx={{ mt: 4, ml: 3, mr: 3 }}>
                  <Stack direction="row" sx={{ mt: 3 }}>
                    <TextField fullWidth type="text" label="개인키" {...getFieldProps('privKey')} />
                  </Stack>
                  <Divider sx={{ mt: 4 }} />
                  <Stack direction="row" sx={{ mt: 3, mb: 3 }} justifyContent="center">
                    {loading === false ? (
                      <Button
                        size="large"
                        variant="contained"
                        sx={{ width: '15%', fontSize: 16 }}
                        onClick={toggleApprove}
                      >
                        취소
                      </Button>
                    ) : null}
                    <LoadingButton
                      size="large"
                      variant="contained"
                      type="submit"
                      sx={{ ml: 3, width: '15%', fontSize: 16 }}
                      loading={loading}
                    >
                      {action === 'cancel' ? '취소' : '완료'}하기
                    </LoadingButton>
                  </Stack>
                </Box>
              </Form>
            </FormikProvider>
          </Card>
        </Modal>
      </Stack>
    </Card>
  );
}
