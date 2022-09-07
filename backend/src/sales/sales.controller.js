/**
 * /sales APIs
 */
const express = require('express');
const router = express.Router();
const SalesService = require('./sales.service');
const salesService = new SalesService();

/**
 * PJT Ⅲ 과제 2: 
 * Req.2-B1 판매 정보 등록 
 */
router.post('/', async function (req, res) {
	const { statusCode, responseBody } = await salesService.createSales(req.body);

	res.statusCode = statusCode;
	res.send(responseBody);
});

/**
 * PJT Ⅲ 과제 2: 
 * Req.2-B2 판매 정보 상세 조회 
 */
router.get('/', async function (req, res) {
	const { statusCode, responseBody } = await salesService.getSales(req.query['token_id']);

	res.statusCode = statusCode;
	res.send(responseBody);
});

/**
 * PJT Ⅲ 과제 3: 
 * Req.3-B1 구매자 정보 업데이트
 */
router.patch('/:tokenId/purchase', async function (req, res) {
	const tokenId = req.params['tokenId'];
	const data = req.body;

	const { statusCode, responseBody } = await salesService.completeSales(tokenId, data)

	res.statusCode = statusCode;
	res.send(responseBody);
});

/**
 * PJT Ⅲ 과제 3: 
 * Req.3-B2 판매 취소
 */
 router.delete('/:saleId', async function (req, res) {
	const { statusCode, responseBody } = await salesService.deleteSales(req.params['saleId']);

	res.statusCode = statusCode;
	res.send(responseBody);
});

/**
 * PJT Ⅲ 과제 3: 
 * Req.3-B3 판매 완료
 * (백엔드가 하는 일은 Req.3-B1의 구매자 정보 업데이트와 같다.)
 */
 router.patch('/:tokenId/complete', async function (req, res) {
	const tokenId = req.params['tokenId'];
	const data = req.body;

	const { statusCode, responseBody } = await salesService.completeSales(tokenId, data)

	res.statusCode = statusCode;
	res.send(responseBody);
});

module.exports = router;
