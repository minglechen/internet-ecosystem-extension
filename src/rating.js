const getRating = (miles, carbon) => {
  return {
    miles: miles,
    carbon: carbon,
    leaves: carbonToRating(carbon), // from 0 to 5
    visualisation: carbonToVisualisation(carbon),
  };
}

const carbonToRating() = (carbon) => {

	carbonIndex = [10,20,30,40];

	for(int=0; i<4; i++){
		if(carbon < carbonIndex[i]){
			return (5 - i);
		}
	}

	return 1;
}

//The average new car emits 120.1g/km of CO

const carbonToVisualisation() = (carbon) => { 
	if(carbon < 1000){
		visualisation = `driving ${Math.ceiling(carbon / 120)} km`
	}
	return `Transporting this good is the equivilant of ${visualisation}`
}
