import json
import geojson


with open ('/tmp/barf.geojson', 'r') as f:
	hugefile = geojson.load(f)

features = hugefile['features']


outfile = open("street_coordinates.csv", "w")
outfile.write("ObjectID\tStreet Name\tLeft Zip\tRight Zip\tGeometry Type\tCoordinates Array\n")


for feature in features:
	#print(type(i),i)
	csv_record = {}
	


	coordinate_array_delimiter = ","
	csv_record['object_id'] = str(feature['properties']['OBJECTID'])
	csv_record['street_name'] = feature['properties']['STREET_NAME'] + ' ' + feature['properties']['STREET_TYPE']
	csv_record['left_zip'] = feature['properties']['L_ZIP']
	csv_record['right_zip'] = feature['properties']['R_ZIP']
	csv_record['geometry_type'] = feature['geometry']['type']
	
	temp_coord_array = []
	for points in feature['geometry']['coordinates']:
		temp_coord_array.append(str(points))
	csv_record['coordinates_array'] = "[" + coordinate_array_delimiter.join(temp_coord_array) + "]"
	#print (csv_record.values())

	#csv_record['coordinates_array'] = array_delimiter.join(feature['geometry']['coordinates'])
	delimiter = "\t"
	outrecord = delimiter.join(list(csv_record.values()))
	outfile.write(outrecord + "\n")
	#print(csv_record.values())
	#print(object_id, street_name,geometry_type,str(coordinates_array) )

outfile.close()


print ("All done")
