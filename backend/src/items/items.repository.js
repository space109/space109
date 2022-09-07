/**
 * items table Manipulations
 * items 테이블에 접근합니다.
 */
const connection = require('../../config/connection').promise();

class ItemsRepository {

	async getItems() {
		const sql = `
			SELECT 		author_name,
						item_description,
						item_hash,
						item_title,
						on_sale_yn,
						owner_address,
						token_id,
						created_at as items_create_at
			FROM    	items
			WHERE 		on_sale_yn = TRUE
			ORDER BY    created_at DESC
		`;
		console.debug(sql);

		return await connection.query(sql)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getItemsByOwnerAddress(address) {
		return null;
	}

	async getRecentRegisteredItem() {
		return null;
	}

	async getRecentItemsOnSale() {
		return null;
	}

	async getItemByTokenId(tokenId) {
		return null;
	}

	async updateItemOwnerAddress(tokenId, ownerAddress) {
		return null;
	}

	async updateItemTokenIdAndOwnerAddress(itemId, tokenId, ownerAddress) {
		return null;
	}

	async validateItemDuplicated(hashCode) {
		return null;
	}

	async createItems(data) {
		return null;
	}
}

module.exports = ItemsRepository;