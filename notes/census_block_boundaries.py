#!/Users/mlautman/Documents/python_venv3.6/bin/python3.6
import sys
import shapefile

shapes = shapefile.Reader(sys.argv[1])
#print(shape)
#print(shapes.fields)
#sys.exit()
#rec = shape.record(3)
#print(rec)
print ("Number of records %s" %(len(shapes.records())))
number_records = len(shapes.records())
outfile = open("/tmp/census.js", "w")

#s = shapes.record(7)
#print(s.bbox)
#print(s['COUNTYFP10'])
#['%.3f' % coord for coord in s.bbox]
#sys.exit()

mocoCensusBlocks = []
for i in range(number_records):
    rec = shapes.record(i)
    if (rec.COUNTYFP10 == "031"):
        print("Printing record " + str(i))
        censusBlock = []
        s = shapes.shape(i)
        for point in s.points:
            censusBlockPoint=[]
            censusBlockPoint.append(float('%.3f' % point[0]))
            censusBlockPoint.append(float('%.3f' % point[1]))
            censusBlock.append(censusBlockPoint)
        mocoCensusBlocks.append(censusBlock)

#hugestring = ",".join(mocoCensusBlocks)

outfile.write(str(mocoCensusBlocks))
    
outfile.close()
print("All done!")