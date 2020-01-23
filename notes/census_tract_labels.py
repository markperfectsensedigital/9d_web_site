#!/Users/mlautman/Documents/python_venv3.6/bin/python3.6
import sys
outfile = open("/tmp/census_labels.js", "w")

censusTractLabels = []

file = open(sys.argv[1], "r") 
for line in file: 
    record = line.split(",")
    record = ("new ol.Feature({geometry: new ol.geom.Point(ol.proj.fromLonLat([%s, %s])), label: \"%s\"})" % (float(record[4]),float(record[5]),record[2]))
    censusTractLabels.append(record)
# new ol.Feature({geometry: new ol.geom.Point(ol.proj.fromLonLat([-77.10960672175668, 38.95773816111915])), label: "Precinct 7027"})

#for i in range(number_records):
#    print("Printing record " + str(i))
#    censusBlock = []
#    s = shapes.shape(i)
#    for point in s.points:
#        censusBlockPoint=[]
#        censusBlockPoint.append(float('%.3f' % point[0]))
#        censusBlockPoint.append(float('%.3f' % point[1]))
#        censusBlock.append(censusBlockPoint)
#    mocoCensusBlocks.append(censusBlock)

#hugestring = ",".join(mocoCensusBlocks)

outfile.write(",".join(censusTractLabels))
    
outfile.close()
print("All done!")