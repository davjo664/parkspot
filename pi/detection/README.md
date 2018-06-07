# What you will need to setup this software:
* Raspberry Pi
* Raspberry Pi Camera
* Power and internet connection to the Pi (wired or wireless)
* Keyboard and mouse for Pi setup

# Pi Software, you will need to have:
**Python Image Library (PIL):**
```
$ sudo apt-get update
$ sudo apt-get install python-imaging-tk
```
**PiCamera:**
```
$ sudo apt-get install python-picamera
```
**Python 2.7 (already pre-installed, Python 3 is not supported)**

# Set up PiPark Framework
**Clone this repo on Raspberry Pi:**
```
$ git clone https://gitlab.com/ParkspotProjectSS18/parkspot.git
```

**Adjust the applications settings:**
```
$ cd ./parkspot/pi/detection/data
$ nano settings.py
```
- modify the setting *MAX_SPACES*: this means the max amount of parking spaces in the parking lot
- modify the setting *SERVER_URL:* this is the enpoint of your api

**Set up the parking lot with its slots:**
```
$ cd ./parkspot/pi/detection
$ python pipark_setup.py
```
1.  After appropriately mounting the PiPark unit its positioning may need to be fine-tuned. To do this, click on the 'Capture New Setup Image' button and then 'Yes' when the dialogue box appears. A full-screen display of the unit's image feed will now be shown. Fine-tune the positioning of the unit and adjust the focus of the lense of the camera, and once this has been finalised press the ENTER key to take a new setup image. Note: If at any time you wish to cancel the image feed without taking a new setup image press the ESCAPE button.

2. Next the parking spaces need to be marked onto the setup image. To do this click on the 'Add/Remove Spaces' button. To mark a space, click once on the setup image to signify a start location, and then click again for the end location of the rectangle that will represent the area of the parking space. For the best result the rectangle must be just smaller than the bounding lines of the parking space. 
Each parking space must be marked on the setup image. To add a new space type the ID of the Parkspot into the input field 'Parkspot/Control Point ID:' and press 'Submit'. If you wish to remove a parking space, select its ID number again and RIGHT-CLICK the mouse. A rundown of the controls is given below:
    * To mark a parking space: LEFT-CLICK twice on the two corners of the parking spot.
    * To delete a selected space: RIGHT-CLICK.
    * To select a new parking space: type the ID of the parkspot into the input field 'Parkspot/Control Point ID:' and press 'Submit'.

3. Afterwards, three control points (CPs) need to be set. This can be done by clicking on the 'Add/Remove Control Points' button and performing single clicks on the setup image. Three control points are required for setup to be completed, and they should be set to a part of the car park that is not a parking space. As with adding/removing parking space references in step (2): RIGHT-CLICK to remove a selected space, and use numbers between 1 to 3 to select a new CP. A rundown of the control is given below:
    * To mark a control point: LEFT-CLICK
    * To delete a control point: RIGHT-CLICK.
    * To select a new control point: type the ID of the controlpoint (1,2,3) into the input field 'Parkspot/Control Point ID:' and press 'Submit'.

4. The final step to save the reference data click the 'Save' button and the click 'OK' when the dialogue box appears.

**Run program to detect free/occupied parking spots and send data to api:**

To run the main PiPark software click on the "Start PiPark" button or, if you wish to run PiPark later: click on the "Quit" button.

**or:**
```
$ cd ./parkspot/pi/detection
$ python main.py 
```