/**
 * /items APIs
 */
const express = require('express');
const router = express.Router();
const ItemsService = require('./items.service');
const itemService = new ItemsService();

/**
 * PJT Ⅱ - 과제 1: Req.1-B1 작품 등록 
 */
router.post('/',  async function (req, res) {
	const { statusCode, responseBody } = await itemService.createItems(req);

	res.statusCode = statusCode;
	res.send(responseBody);
});

/**
 * PJT Ⅱ 과제 2: 
 * Req.2-B1 작품 목록 조회 
 * Req.2-B2 주소가 보유한 작품 목록 조회
 *
 * PJT Ⅲ 과제 4: (판매 중인 작품만 반환하도록 수정합니다.)
 * Req.4-B1 작품 목록 조회
 * Req.4-B2 주소가 보유한 작품 목록 조회
 */
router.get('/', async function (req, res) {
	const { statusCode, responseBody } = await itemService.getItems(req.query['address']);

	res.statusCode = statusCode;
	res.send(responseBody);
});

/*
 * PJT Ⅲ 과제 3: 
 * Req.4-B3 최근 등록 작품 조회
 */
router.get('/recent', async function (req, res) {
	const { statusCode, responseBody } = await itemService.getRecentItems(res);

	res.statusCode = statusCode;
	res.send(responseBody);
});

/**
 * PJT Ⅱ 과제 2: 
 * Req.2-B3 작품 상세 조회 
 */
router.get('/:tokenId', async function (req, res) {
	const { statusCode, responseBody } = await itemService.getItemByTokenId(req.params['tokenId'])

	res.statusCode = statusCode;
	res.send(responseBody);
});

module.exports = router;