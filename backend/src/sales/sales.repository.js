/**
 * sales table Manipulations
 * sales 테이블에 접근합니다.
 */
const connection = require('../../config/connection').promise();

class SalesRepository {

	async createSales(data) {
		return true;
	}

	async getSalesByTokenId(tokenId) {
		return null;
	}

	async getSales() {
		return null;
	}

	async deleteSales(saleId) {
		return null;
	}

	async completeSales(tokenId, data) {
		return null;
	}
}

module.exports = SalesRepository;




