#!/usr/bin/python3.6
import json
import sys

# At the command line, enter python3 community_coordinates.py 

#if (len(sys.argv) != 2):
#	print ("\nSyntax: python3 order_street_coords.py <object_id\n")
#	sys.exit()


print ("Ordering coordinates")

bounding_box = {'lower_left':{'lon': 0, 'lat': 90},'upper_right':{'lon': -180, 'lat': 0}}

with open ('/home/abba/maryland-politics/NineDistrictsForMoCo/openmap9d/notes/communities.geojson', 'r') as f:
	hugefile = json.load(f)

features = hugefile['features']

community_object_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 56 ]

all_community_coordinates = []


for feature in features:
    if (feature['properties']['OBJECTID'] in community_object_ids):
        single_community_coordinates = []
        for community_segment in feature['geometry']['coordinates']:
            single_community_coordinates.append(community_segment)

    all_community_coordinates.append(single_community_coordinates)

outfile = open("/tmp/community_multipoly.txt", "w")
outfile.write(str(all_community_coordinates) + "\n")
#for community_cooord in all_community_coordinates:
#	outfile.write(str(community_cooord) + ",\n")

outfile.close()


for poly_coord in all_community_coordinates:
    for coord in poly_coord:
        for single_coord in coord:
#            print(len(single_coord))
#            print (type(bounding_box['lower_left']['lon']))
            bounding_box['lower_left']['lon'] = single_coord[0] if (single_coord[0] < bounding_box['lower_left']['lon']) else bounding_box['lower_left']['lon']
            bounding_box['lower_left']['lat'] = single_coord[1] if (single_coord[1] < bounding_box['lower_left']['lat']) else bounding_box['lower_left']['lat']
            bounding_box['upper_right']['lon'] = single_coord[0] if (single_coord[0] > bounding_box['upper_right']['lon']) else bounding_box['upper_right']['lon']
            bounding_box['upper_right']['lat'] = single_coord[1] if (single_coord[1] > bounding_box['upper_right']['lat']) else bounding_box['upper_right']['lat']


print ("All done. Results in /tmp/community_multipoly.txt")

print ("Lower left %s, %s" %( bounding_box['lower_left']['lon'],  bounding_box['lower_left']['lat']))
print ("Upper right %s, %s" %( bounding_box['upper_right']['lon'],  bounding_box['upper_right']['lat']))
