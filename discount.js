const availableOffers = require('./offers')
// Calculate discount
const calculateDiscount = (package) =>{
    const matchingOffer = availableOffers.find(offer => offer.code === package.PackageOfferCode);
    const deliveryCost = package.baseDeliveryCost + (package.packageWeight * 10) +
        (package.packageDistance * 5);
        let discount = 0
        let discountedPrice = 0;
        if (matchingOffer) {
            if (typeof (matchingOffer.distance) == "number") {
                if (parseInt(package.packageDistance) < matchingOffer.distance) {
                    const [minWeight, maxWeight] = matchingOffer.weight;
                    if (parseInt(package.packageWeight) >= minWeight && parseInt( package.packageDistance) <= maxWeight) {
                        discount = deliveryCost *  (matchingOffer.discountPercentage / 100) 
                        discountedPrice = deliveryCost - discount;
                    }
                } 
            }
            else {
                const [minDistance, maxDistance] = matchingOffer.distance;
            if (parseInt(package.packageDistance) >= minDistance && parseInt( package.packageDistance) <= maxDistance) {
                    const [minWeight, maxWeight] = matchingOffer.distance;
                    if (package.packageDistance >= minWeight && package.packageDistance <= maxWeight) {
                        discount = deliveryCost *  (matchingOffer.discountPercentage / 100) 
                        discountedPrice = deliveryCost - discount;
                    }
                }
            }
        }
         Object.assign(package, { deliveryCost,discount, discountedPrice })
    return package;
}

module.exports = calculateDiscount;
