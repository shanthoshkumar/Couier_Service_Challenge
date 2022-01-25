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
        const noOfInputs = parseInt(baseInput[1]) + 2;
        if (lines.length == noOfInputs) {
            rl.close();
            processsData(lines)
        }
    });
}
readInputs()

// Get Delivery time    
const processsData = (lines) => {
    const [baseDeliveryCost, noOfPackages] = lines[0].split(" ").map(value => parseInt(value));
    const packages = lines.slice(1, lines.length-1);
    const additionalInfo = lines[lines.length - 1]; 
    const [noOfVehicles, maxSpeed, limit] = additionalInfo.split(" ").map(value => parseInt(value));
    const packagesList = packages.map(package => {
        const [packageId, packageWeight, packageDistance, PackageOfferCode] = package.split(" ");
        return {baseDeliveryCost, packageId, packageWeight, packageDistance, PackageOfferCode}
    })
    const processedPackages = packagesList.map(calculateDiscount);
    const packagesToShipment = processedPackages.map((processedPackage, index) => {
        return {
            ...processedPackage,
            id: index + 1,
            packageWeight: parseInt(processedPackage.packageWeight)

        }
    })
    // Given info
    console.log(`Vehicles: ${noOfVehicles}, maxSpeedPerHr: ${maxSpeed} and limit: ${limit}`);
   findPair(packagesToShipment, noOfVehicles, maxSpeed, limit);
}


function findPair(weights, noOfVehicles, maxSpeed, limit) {
    const pairedWeights=[]
    weights.forEach(weight => {
        const remaining = weights.filter(_weight => _weight.id != weight.id);
        const pairs = remaining.filter(remaining => (weight.packageWeight + remaining.packageWeight) <= parseInt(limit));
        const sortedPair = pairs.sort((a,b) => {
            if ( a.packageWeight > b.packageWeight) return -1
            else return 1;
        })
        if (pairs.length) {
            const pair = {
                id: `${weight.id}-${sortedPair[0].id}`,
                packageWeight: weight.packageWeight + sortedPair[0].packageWeight,
                combinedWeight: weight.packageWeight + sortedPair[0].packageWeight
            }
            pairedWeights.push(pair)
        } else {
            pairedWeights.push(weight)
        }

    })
    
        // sort by maximum combined shipment
    const combinedShipments = pairedWeights.sort((pairA, pairB) => {
        if (pairA.packageWeight > pairB.packageWeight) return -1;
        else return 1
    })
    console.log("combinedShipments", combinedShipments
    );
    
    // combinedShipments.forEach(shipment => {
    //     const otherShipments = combinedShipments.filter(_shipment => {
    //         const shipmentIds = String(shipment.id).split("-");
    //         const otherShipmentIds = String(_shipment.id).split("-");
    //         if (!otherShipmentIds.includes(shipmentIds[0])) {
    //             if (shipmentIds[1] && !otherShipmentIds.includes(shipmentIds[1])) {
    //                 return true;
    //             }
    //             return true;
    //         } else {
    //             return false;
    //         }

    //         if ()
    //             String(_shipment.id) != String(shipment.id))
    // })
    //     console.log(shipment.id, otherShipments);
    // })
    // const dePairedPackages = combinedShipments.map(combinedShipment => {
    //     if (combinedShipment.id.toString().split("-").length > 1) {
    //         const ids = combinedShipment.id.toString().split("-");
    //         const pairs = ids.map(id => weights.find(weight => weight.id === parseInt(id)));
    //         return pairs
    //     } else {
    //         return combinedShipment
    //     }
    // })
    // dePairedPackages.forEach(pairedPackage => {
    //     const otherPairs = dePairedPackages.filter(pair=>)
        
    // // console.log(pairedPackage);
    // })
    //

}
