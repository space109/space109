/**
 * Services Logics related to Digital Assets(item)
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const ItemsRepository = require('./items.repository');
const itemRepository = new ItemsRepository();

class ItemsService {

	/**
 	 * PJT Ⅱ - 과제 1: Req.1-B1 작품 등록 
	 * 1. 저장된 작품의 id를 responseBody에 추가하여 반환합니다.
	 * 
     */
	async createItems(req) {
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				itemId: 0
			}
		}
	}

	/**
	 * PJT Ⅱ 과제 2: 
	 * Req.2-B1 작품 목록 조회 
	 * Req.2-B2 주소가 보유한 작품 목록 조회
	 *
	 * PJT Ⅲ 과제 4: (판매 중인 작품만 반환하도록 수정합니다.)
	 * Req.4-B1 작품 목록 조회
	 * Req.4-B2 주소가 보유한 작품 목록 조회
	 */
	async getItems(address) {
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: []
			}
		};
	}

	/*
	 * PJT Ⅲ 과제 3: 
	 * Req.4-B3 최근 등록 작품 조회
	 */
	async getRecentItems() {
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: []
			}
		}
	}

	/**
	 * PJT Ⅱ 과제 2: 
	 * Req.2-B3 작품 상세 조회 
	 */
	async getItemByTokenId(tokenId) {
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: []
			}
		};
	}

}

module.exports = ItemsService;