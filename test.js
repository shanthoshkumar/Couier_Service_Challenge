const limit = 200;
const maxSpeedPerHour = 70; 
const vehicles = 2;
const pairedWeights = []
const weights = [{ id: 1, weight: 50 , distance: 30}, { id: 2, weight: 75, distance: 125 }, { id: 3, weight: 175, distance:100 }, { id: 4, weight: 110 , distance:60}, { id: 5, weight: 155, distance:95 }]
function findPair(weightsArr) {
    weightsArr.forEach(weight => {
        const remaining = weightsArr.filter(_weight => _weight.id != weight.id);
        const pairs = remaining.filter(remaining => (weight.weight + remaining.weight) <= limit);
        const sortedPair = pairs.sort((a,b) => {
            if ( a.weight > b.weight) return -1
            else return 1;
        })
        if (pairs.length) {
            const pair = {
                id: `${weight.id}-${sortedPair[0].id}`,
                weight: weight.weight + sortedPair[0].weight,
                combinedWeight: weight.weight + sortedPair[0].weight
            }
            pairedWeights.push(pair)
        } else {
            pairedWeights.push(weight)
        }

    })
    
        // sort by maximum combined shipment
    const combinedShipments = pairedWeights.sort((pairA, pairB) => {
        if (pairA.weight > pairB.weight) return -1;
        else return 1
    })
    console.log(combinedShipments);
    // const processedIds = []
    // combinedShipments.forEach(shipment => {
    //     const [id1, id2] = String(shipment.id).split("-");
    //     if (!processedIds.includes(id1)) {
    //         if (id2 && !processedIds.includes(id2)) {
    //             processedIds.push(id1);
    //             processedIds.push(id2);
    //             const p1 = weights.find(weight=>weight.id === parseInt(id1))
    //             const p2 = weights.find(weight => weight.id === parseInt(id2))
    //             console.log(`${JSON.stringify(p1)} and ${JSON.stringify(p2)} and ${shipment.combinedWeight}`);
    //         } else {
    //             processedIds.push(id1);
    //             const p = weights.find(weight => weight.id === parseInt(id1))
    //             console.log(`${JSON.stringify(p)}`);
    //         }
    //     }
        
    // })
    // console.log(processedIds.map(id => parseInt(id)));
    

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

findPair(weights)
// console.log(final);