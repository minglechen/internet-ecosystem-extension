const milesToCarbon = (miles) => {
  const weight = 0.001; //tonnes

  let method;
  if (miles < 500){
    method = "road";
  } else if (miles < 3000){
    method = "short-haul air";
  } else {
    method = "long-haul air"
  }

  const emissions = {
    road: 62,
    rail: 22,
    "short-haul air": 1752,
    "long-haul air": 602
  }; //in grams per tonne, per km

  return weight * emissions[method] * miles * 1.609; // in grams
}

const carbonToVisualisation = (carbon) => {
  const vis = Math.floor(Math.random() * 4);
  if (vis == 0){
    return "Equivalent to " + (carbon / 171).toFixed(2) + "  miles in a car";
  }
  if (vis == 1){
    return "Equivalent to " + (carbon / 500).toFixed(2) + " loaves of bread";
  }
  if (vis == 2){
    return "Equivalent to " + (carbon / 7000).toFixed(2) + " days of heating a house";
  }
  if (vis == 3){
    return "Equivalent to " + (carbon / 36).toFixed(2) + " hours of streaming video";
  }
}
