from .config import api_key
import googlemaps
from datetime import datetime


def getLatiLongi(address):
    gmaps = googlemaps.Client(key=api_key)
    # Geocoding an address
    geocode_result = gmaps.geocode(address)
    lat = geocode_result[0]["geometry"]["location"]["lat"]
    lng = geocode_result[0]["geometry"]["location"]["lng"]
    return lat, lng
