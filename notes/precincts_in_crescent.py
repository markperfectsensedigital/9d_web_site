#!/usr/bin/python3.6
import json
import sys

def inside_bounding_box(properties):
    bounding_box = {'lower_left':{'lon': -77.21406167229496, 'lat': 38.934216906802604},
    'upper_right':{'lon': -76.9717598108188, 'lat': 39.07182682073789}}
    
    if ((properties['x_lat'] is None) or (properties['y_lat'] is None)):
        return False

    #print(str(properties['OBJECTID']) + " " + properties['DANDP'])

    return ((properties['x_lat'] > bounding_box['lower_left']['lon']) and 
        (properties['x_lat'] < bounding_box['upper_right']['lon']) and 
        (properties['y_lat'] > bounding_box['lower_left']['lat']) and
        (properties['y_lat'] < bounding_box['upper_right']['lat']))


print ("Searching for precincts inside bounding box")

with open (sys.argv[1], 'r') as f:
	hugefile = json.load(f)

features = hugefile['features']

outfile = open("precincts_in_bounding_box.csv", "w")
marker_file = open("precincts_in_bounding_box.js", "w")
outfile.write("Precinct\tCouncil District\tLon\tLat\n")

# precincts_to_exclude = [4, 5]
precincts_to_exclude = [10013, 10010, 10002, 4023, 4011, 10001, 4037,4027,13043, 10009, 10004, 10012, 10006, 4029, 10005, 4012, 4032, 4025, 4007, 4038, 13070, 13036, 13035, 13028, 13029, 13063, 13002, 13020, 13033, 5022, 13011, 13042, 13019, 5003, 5010, 5013, 5006, 5022, 5011, 5005]

where_clause = []

for feature in features:
    if (inside_bounding_box(feature['properties']) and (int(feature['properties']['DANDP']) not in precincts_to_exclude)):

        outfile.write("%s\t%s\t%s\t%s\n" %(feature['properties']['DANDP'],
            feature['properties']['COUNCIL'],
            feature['properties']['x_lat'],
            feature['properties']['y_lat']))

        marker_file.write('new ol.Feature({geometry: new ol.geom.Point(ol.proj.fromLonLat([%s, %s])), label: "Precinct %s"}),\n' %(feature['properties']['x_lat'],feature['properties']['y_lat'],feature['properties']['DANDP'].lstrip("0")))

        where_clause.append(feature['properties']['DANDP'])
outfile.close()
marker_file.close()

sqlfile = open("extract_precincts.sql", "w")
sqlfile.write ("SELECT Precinct, COUNT(VID) FROM voter_registrations WHERE Precinct IN (" + ",".join(where_clause)+ ") GROUP BY Precinct;")
sqlfile.close()


print ("All done. Results in precincts_in_bounding_box.csv")
