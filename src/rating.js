import { milesToCarbon, carbonToVisualisation } from './carbon.js';

export const getRating = (miles) => {
	const carbon = milesToCarbon(miles);

  return {
    miles,
    carbon,
    rating: carbonToRating(carbon), // from 0 to 5
    visualisation: carbonToVisualisation(carbon),
  };
}

const carbonToRating = (carbon) => {
	const carbonIndex = [10, 20, 30, 40];

	for (let i = 0; i < 4; i++) {
		if (carbon < carbonIndex[i]) {
			return 5 - i;
		}
	}

	return 1;
}
