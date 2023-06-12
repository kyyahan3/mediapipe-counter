# route
from django.urls import path
from . import apps

# api/{app.urls}
urlpatterns = [
    path('/upload_video_endpoint', apps.upload_video_endpoint, name="upload_video_endpoint"),
    path('/get_processed_video', apps.get_processed_video, name='get_processed_video'),
    path('/test', apps.test, name="test")
]
