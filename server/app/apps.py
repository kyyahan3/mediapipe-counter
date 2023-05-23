# process data
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

from app.JumpRope import JRcount


@require_http_methods("POST")
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
            'frames': tep[3]
        }
        return JsonResponse(response_data)

    return HttpResponse("Invalid request")


@require_http_methods("GET")
def test():
    print("right?")
    return response(0, "ok")
