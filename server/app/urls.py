# route
from django.urls import path
from . import apps

# api/{app.urls}
urlpatterns = [
    path('/upload_video_endpoint', apps.upload_video_endpoint, name="upload_video_endpoint"),
    path('/test', apps.test, name="test"),
]
