/**
 * Services Logics related to Sale
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const SalesRepository = require('./sales.repository');
const salesRepository = new SalesRepository();

class SalesService {


	/**
	 * PJT Ⅲ 과제 2: 
	 * Req.2-B1 판매 정보 등록 
	 */	
	async createSales(data) {
		return {
			statusCode: 201,
			responseBody: {
				result: 'success'
			}
		};
	}

	/**
	 * PJT Ⅲ 과제 2: 
	 * Req.2-B2 판매 정보 상세 조회 
	 */
	async getSales(tokenId) {
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: []
			}
		};
	}

	/**
	 * PJT Ⅲ 과제 3: 
	 * Req.3-B1 구매자 정보 업데이트
	 * Req.3-B3 판매 완료
	 */
	async completeSales(tokenId, data) {
		return {
			statusCode: 200,
			responseBody: {
				result: 'success'
			}
		};
	}

	/**
	 * PJT Ⅲ 과제 3: 
	 * Req.3-B2 판매 취소
	 */
	async deleteSales(saleId) {
		return {
			statusCode: 201,
			responseBody: {
				result: 'success'
			}
		};
	}

}

module.exports = SalesService;