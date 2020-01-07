import sys
import re

comma_pattern = re.compile('^(.*),(.*)$')

bracket_pattern = re.compile('\[(.*)\]')
raw_coordinate_array = bracket_pattern.match( sys.argv[1] ).group(1).split('],[')
print ("Your coordinates in lat-long:")
for coordinates in raw_coordinate_array:
    clean_coordinates = coordinates.strip('[]')
    lat_lon = comma_pattern.match(clean_coordinates)
    lon_lat = lat_lon.group(2) + ", " + lat_lon.group(1)
    print (lon_lat)
