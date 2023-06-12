# process data
from django.http import HttpResponse, JsonResponse, FileResponse
from django.views.decorators.http import require_http_methods
import os

from app.JumpRope import JRcount


@require_http_methods(["POST", "GET"])
def upload_video_endpoint(request):
    if request.method == 'POST' and request.FILES.get('video'):
        video_file = request.FILES['video']

        # Process the video file
        with open('buffer_vid.mp4', 'wb') as file:
            for chunk in video_file.chunks():
                file.write(chunk)
        print("File uploaded successfully.")

        category = request.POST.get("clickInfo")
        print(category)
        tep = []
        if category == 'JumpRope':
            tep = JRcount("buffer_vid.mp4")

        print(tep)
        response_data = {
            'date': str(tep[0]),
            'category': str(tep[1]),
            'count': str(tep[2]),
        }
        return JsonResponse(response_data)

    return HttpResponse("Invalid request")

@require_http_methods("GET")
def get_processed_video(request):
    processed_video_path = "./app/processed_vid.mp4"
    if os.path.exists(processed_video_path):
        return FileResponse(open(processed_video_path, 'rb'), content_type='video/mp4')
    else:
        return HttpResponse("Processed video not found.", status=404)
    

@require_http_methods("GET")
def test(request):
    print("test")
    data = {
        'status': 0,
        'message': 'ok'
    }
    return JsonResponse(data, safe=False)
