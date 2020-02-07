export const findClosestStop = (singlePassengerCoordinates, allStopsCoordinates) => {
    if(!allStopsCoordinates) return false;

    let minDistance = calculateDistance(singlePassengerCoordinates, allStopsCoordinates[0]);
    let closestStop = allStopsCoordinates[0];

    for(let stop of allStopsCoordinates){
        let potentialMinDistance = calculateDistance(singlePassengerCoordinates, stop);
        if(potentialMinDistance<minDistance){
            minDistance= potentialMinDistance;
            closestStop= stop;
        }
    }

    return closestStop;
}

export const countClosestPeopleToStop = (stopCoordinates, allStopsCoordinates, passengerCoordinates) => {
    let count = 0;
    for(let passenger of passengerCoordinates){
        const closestStop = findClosestStop(passenger, allStopsCoordinates);
        if(closestStop.lat == stopCoordinates.lat &&
            closestStop.lon === stopCoordinates.lon){
                count++;
            }
    }

    return count;
}

//calculate distance is generic enough in case it gets reused
const calculateDistance = (coordinates1, coordinates2) => {
    return pythagoras(
        {x: coordinates1['lon'], y:coordinates1['lat']}, 
        {x: coordinates2['lon'], y:coordinates2['lat']}
    );
}

const pythagoras = (point1, point2) => {
    return Math.sqrt(
        Math.pow(
            point1.x-point2.x, 
            2
        ) + 
        Math.pow(
            point1.y-point2.y,
            2
        )
    )
}