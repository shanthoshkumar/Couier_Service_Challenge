var readline = require('readline');

function readInputs() {
    const rl = readline.createInterface({
    input: process.stdin,output:process.stdout
    });
    const lines = [];
    function end() {
        rl.close();
    }
    rl.on('line', line => {
        lines.push(line);
        const baseInput = lines[0].split(" ");
        const noOfInputs = parseInt(baseInput[1]) + 1;
        if (lines.length == noOfInputs) {
            rl.close();
            processsData(lines)
        }
    });
}


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

// Calculate discount
function calculateResult(package) {
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

// Get Delivery Cost    
function processsData(lines) {
    const [baseDeliveryCost, noOfPackages] = lines[0].split(" ").map(value => parseInt(value));
    const packages = lines.slice(1);
    const packagesList = packages.map(package => {
        const [packageId, packageWeight, packageDistance, PackageOfferCode] = package.split(" ");
        return {baseDeliveryCost, packageId, packageWeight, packageDistance, PackageOfferCode}
    })
    const processedPackages = packagesList.map(calculateResult);
    processedPackages.forEach(package => {
        console.log(`${package.packageId} ${package.discount} ${package.discountedPrice === 0 ? package.deliveryCost : package.discountedPrice}`);
    });
}


readInputs();