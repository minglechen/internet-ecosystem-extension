export const milesToCarbon = (miles) => {
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

export const carbonToVisualisation = (carbon) => {
  const vis = Math.floor(Math.random() * 3);
  if (carbon < 100){
    if (vis == 0){
      return "Equivalent to travelling " + (carbon / 41).toFixed(2) + "  km on a train";
    }
    if (vis == 1){
      return "Equivalent to " + (carbon / 36).toFixed(2) + " hours of streaming video";
    }
    if (vis == 2){
      return "Equivalent to turning an LED light on for " + (carbon / 1.43).toFixed(2) + " minutes";
    }
  }
  if (vis == 2){
    return "Equivalent to heating a house for " + (carbon / 291).toFixed(2) + " hours";
  }
  if (carbon < 2000 ){
    if (vis == 0){
      return "Equivalent to driving " + (carbon / 171).toFixed(2) + "  km in a car";
    }
    if (vis == 1){
      return "Equivalent to growing " + (carbon / 500).toFixed(2) + " loaves of bread";
    }
  }

  if (vis == 0){
    return "Equivalent to flying " + (carbon / 133).toFixed(2) + "  km in a plane";
  }
  if (vis == 1){
    return "Equivalent to a cow's emissions in " + (carbon / 262).toFixed(2) + " hours";
  }
  
}
