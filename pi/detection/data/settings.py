from uuid import getnode as get_mac
PI_ID = get_mac()
CAMERA_WINDOW_SIZE = [0, 0, 0, 0]
PICTURE_RESOLUTION = [0, 0]
WAKEUP_DELAY = 2
PICTURE_DELAY = 2
PICTURE_RESOLUTION[0] = 960
PICTURE_RESOLUTION[1] = 540
CAMERA_WINDOW_SIZE[2] = 960
CAMERA_WINDOW_SIZE[3] = 540
IMAGE_THRESHOLD = 20
MAX_SPACES = 100
MAX_CPS = 3
IS_VERBOSE = True
PARK_ID = 1
SERVER_PASS = "pi"
SERVER_URL = "https://parkspot.mi.hdm-stuttgart.de/api/input"

