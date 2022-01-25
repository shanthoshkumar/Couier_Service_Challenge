// Delivery cost estimation offers
const availableOffers = [
    {
        code: "OFR001",
        discountPercentage: 10,
        distance: 200,
        weight:[70,200]
    },
    {
        code: "OFR002",
        discountPercentage: 7,
        distance: [50,150],
        weight:[100,250]
    },
    {
        code: "OFR003",
        discountPercentage: 5,
        distance: [50,250],
        weight:   [10,250]
    }]

module.exports = availableOffers;