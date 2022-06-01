const {StockListItemDto} = require("../../dto");

function stockModelToListItemDtoMapper(stock) {
    return new StockListItemDto(
        stock.id,
        stock.quantity,
    )
}

module.exports = stockModelToListItemDtoMapper
