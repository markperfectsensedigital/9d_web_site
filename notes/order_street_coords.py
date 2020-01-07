#!/usr/bin/python3.6
import json
#import geojson
import sys

# At the command line, enter python3 order_street_coords.py "OLD GEORGETOWN" "RD" NS|EW

if (len(sys.argv) != 4):
	print ("\nSyntax: python3 order_street_coords.py \"OLD GEORGETOWN\" \"RD\" NS|EW\n")
	sys.exit()

street_name = sys.argv[1]
street_type = sys.argv[2]
sort_dir = sys.argv[3]


print ("Ordering coordinates for %s %s" %(street_name, street_type))


with open ('/tmp/hugefile_parsed.json', 'r') as f:
	hugefile = json.load(f)

features = hugefile['features']

street_coordinates = []
for feature in features:
	if ((feature['properties']['STREET_NAME'] == street_name) and 
	(feature['properties']['STREET_TYPE'] == street_type)):
		for street_segment in feature['geometry']['coordinates']:
			street_coordinates.append(street_segment)

if (sort_dir == "EW"):
	street_coordinates.sort(key= lambda coord: coord[0])
else:
	street_coordinates.sort(key= lambda coord: coord[1])

outfile = open("/tmp/street_coordinates.txt", "w")
for local_coord in street_coordinates:
	outfile.write(str(local_coord) + ",\n")

outfile.close()


print ("All done. Results in /tmp/street_coordinates.txt")
