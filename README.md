# Internet-ecosystem-extension
Browser extension to calculate air miles

## Inspiration

With online shopping, the ease of ordering items sometimes makes it easy to forget how far items are delivered. Carbon emissions from international shipping are contributing to climate change and rising sea levels. If we are to become more sustainable, we need to pay more attention to the journeys the items we purchase take.

## What it does

Our project is a web extension that adds a rating to each item on eBay based on the estimated distance it has travelled. Underneath each item on the search page is an easy to understand ranking from zero to five leaves, alongside the estimated carbon footprint with a comparison to help explain the impact.

## How we built it

Our project is a browser extension written in JavaScript. We developed an API using Google Cloud's geocoding API to translate the names of locations on eBay to latitudes and longitudes. We then used the object's location to calculate the number of miles, and therefore the carbon emissions involved. We
then updated the HTML to include a rating, using leaves to represent the environmental impact.

## Challenges we ran into

We decided to use the geocoding API, which converts text addresses to latitude and longitude. However this requires an API key, which should not be public. Therefore we needed to create a webserver to handle this, which was an unexpected difficulty.

(Not realising a difference between .com and .co.uk also turned out to be a significant issue)

## Accomplishments that we're proud of

We are proud that we built a functioning extension that will make a significant difference to people's shopping habits.

## What we learned

Nobody on our team had implemented a browser extension before, so we learnt how to do this and the challenges that it presented.

## What's next for Internet Ecosystem

We would like to extend this to other popular e-commerce websites, so that users can benefit from this when doing other shopping. We would also like to add extra functionality, which could include comparing a different products' carbon footprints, and giving the user alternatives.
