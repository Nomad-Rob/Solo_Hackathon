THis will use an ads-b api to get the location of airplanes and then use the google maps api to display the location of the airplanes on a map.
It will display a picture and specs of the closest airplane to the user.

I will build this using:
- HTML
- CSS
- Python


I will use the following APIs:
- google maps api
- open_sky api


To do this I need the following files:
- index.html
- style.css
- backend.py
- script.js
- README.md

I will use the following resources:
- https://www.adsbexchange.com/data/
- https://developers.google.com/maps/documentation/javascript/overview
- https://getbootstrap.com/docs/4.5/getting-started/introduction/
- https://jquery.com/
- https://www.w3schools.com/
- https://stackoverflow.com/





# Limitations for OpenSky users
An OpenSky user is anybody who uses a valid OpenSky account (see below) to access the API. The rate limitations for OpenSky users are:

OpenSky users can retrieve data of up to 1 hour in the past. If the time parameter has a value 
 the API will return 400 Bad Request.

OpenSky users can retrieve data with a time resolution of 5 seconds. That means, if the time parameter was set to 
, the API will return state vectors for time 
.

OpenSky users get 4000 API credits per day. For higher request loads please contact OpenSky.

Active contributing OpenSky users get a total of 8000 API credits per day. An active user is a user which has an ADS-B receiver that is at least 30% online (measured over the current month).

## Note

You can retrieve all state vectors received by your receivers without any restrictions. See Own State Vectors. Before the request limit is reached the header X-Rate-Limit-Remaining indicates the amount of remaining credits. After the rate limit is reached the status code 429 - Too Many Requests is returned and the header X-Rate-Limit-Retry-After-Seconds indicates how many seconds until credits/request become available again.

## API credit usage¶
API credits are only used for the /states/all API endpoint. Credit usage is lower in general for restricted/smaller areas. The area can be restricted by using the lamin, lamax, lomin, lomax query parameters. The area square deg column in the table below, indicates the square degree limit- e.g. a box extending over latitude 10 degress and longitude 5 degrees, would equal 50 square degrees:

Area square deg

Credits

Example

0 - 25 (<500x500km)

1

/api/states/all?lamin=49.7&lamax=50.5&lomin=3.2&lomax=4.6

25 - 100 (<1000x1000km)

2

/api/states/all?lamin=46.5&lamax=49.9&lomin=-1.4&lomax=6.8

100 - 400 (<2000x2000km)

3

/api/states/all?lamin=42.2&lamax=49.8&lomin=-4.7&lomax=10.9

over 400 or all (>2000x2000km)

4

/api/states/all



# Stopping for the evening
Got it to produce data , now to narrow the data down to the closest airplane to the user.
Then show location of user and nearest aircraft.
Clean up the GUI to make it pretty.
