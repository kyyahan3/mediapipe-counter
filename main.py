from server.app.JumpRope import JRcount


def jumprpoe_count(video):
    tmp = JRcount(video)
    return tmp

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    vid_path = "/Users/yahan/Library/CloudStorage/OneDrive-Vanderbilt/大四/毕设/test_vid"
    jumprpoe_count(vid_path + '/JR4.mp4')