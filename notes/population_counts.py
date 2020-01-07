
import sys
import shapefile

shape = shapefile.Reader(sys.argv[1])
#print(shape)
#print(shape.fields)
#rec = shape.record(3)
#print(rec)
print ("Number of records %s" %(len(shape.records())))
number_records = len(shape.records())
county_population = 0
outfile = open("/tmp/census.csv", "w")
outfile.write ("OBJECTID\tCNTY2010\tCT2010\tBG2010\tBLOCK\tBLK2010\tACRES\tSQ_MILES\tP0020001\n")

for i in range(number_records):
    rec = shape.record(i)
    if (rec['CNTY2010'] == "24031"):
        print ("Printing record " + str(i))
        county_population += rec['P0020001']
        outfile.write('\t'.join([str(rec['OBJECTID']), \
        rec['CNTY2010'], \
        rec['CT2010'], \
        rec['BG2010'], \
        rec['BLOCK'], \
        rec['BLK2010'], \
        str(rec['ACRES']), \
        str(rec['SQ_MILES']), \
        str(rec['P0020001']) \
        ]) + "\n")

outfile.close()

print("The county population is %s" %(county_population))