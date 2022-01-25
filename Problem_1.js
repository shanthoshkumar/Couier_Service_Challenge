const readline = require('readline');
const calculateDiscount = require('./discount')

const readInputs = () => {
    const rl = readline.createInterface({
    input: process.stdin,output:process.stdout
    });
    const lines = [];
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

// Get Delivery Cost    
const processsData=(lines)=> {
    const [baseDeliveryCost, noOfPackages] = lines[0].split(" ").map(value => parseInt(value));
    const packages = lines.slice(1);
    const packagesList = packages.map(package => {
        const [packageId, packageWeight, packageDistance, PackageOfferCode] = package.split(" ");
        return {baseDeliveryCost, packageId, packageWeight, packageDistance, PackageOfferCode}
    })
    const processedPackages = packagesList.map(calculateDiscount);
    processedPackages.forEach(package => console.log(`${package.packageId} ${package.discount} ${package.discountedPrice === 0 ? package.deliveryCost : package.discountedPrice}`));
}


readInputs();