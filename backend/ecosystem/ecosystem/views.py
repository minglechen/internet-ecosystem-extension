from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .google_map import getLatiLongi


# Create your views here.
class MileView(APIView):
    def post(self, request, format=None):
        print(request.data)
        location = request.data
        lat, lng = getLatiLongi(location)
        response_dict = {"longitude": lng, "latitude": lat}
        return Response(response_dict, status=200)
