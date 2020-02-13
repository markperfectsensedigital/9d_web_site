
import sys
import shapefile

shapes = shapefile.Reader(sys.argv[1])

print ("Number of records %s" %(len(shapes.records())))
number_records = len(shapes.records())
outfile_down_county = open("/tmp/down-county-census.js", "w")
outfile_up_county = open("/tmp/up-county-census.js", "w")

dcc_list = ['703209', '703210', '704600', '704401', '705800', '705300', '701704', '702602', '702800', '705701', '704502', '701703', '705400', '701202', '701900', '703902', '701701', '701213', '702301', '704000', '701506', '703208', '701800', '702402', '702401', '702601', '702200', '702101', '703000', '705702', '702700', '705602', '705902', '705601', '701702', '703404', '701215', '703207', '701205', '706005', '700905', '703502', '704300', '701206', '706009', '701214', '704700', '704503', '704501', '701219', '701218', '701216', '706011', '706013', '706010', '706012', '702302', '701201', '705100', '705903', '704404', '703100', '702900', '705200', '703601', '702000', '701421', '701509', '701508', '701602', '701601', '703401', '703501', '705000', '701503', '702500', '704200', '703701', '704806', '704804', '704803', '705502', '705501', '705901', '702102', '703800', '703702', '704805', '704403', '704100', '703602', '701505', '703901' ]

downCountyCensusBlocks = []
upCountyCensusBlocks = []
for i in range(number_records):
    censusBlock = []
    s = shapes.shape(i)
    r = shapes.record(i)
    print("Printing record " + str(i) + " for " + r['TRACTCE10'] )
    for point in s.points:
        censusBlockPoint=[]
        censusBlockPoint.append(float('%.3f' % point[0]))
        censusBlockPoint.append(float('%.3f' % point[1]))
        censusBlock.append(censusBlockPoint)
    if (r['TRACTCE10'] in dcc_list): 
       print("I found a cencus tract in the list")
       downCountyCensusBlocks.append(censusBlock)
    else:
       upCountyCensusBlocks.append(censusBlock)

dcc_string = str(downCountyCensusBlocks)
dcc_string = dcc_string.replace(", [",",\n [")

ucc_string = str(upCountyCensusBlocks)
ucc_string = ucc_string.replace(", [",",\n [")


outfile_down_county.write(dcc_string)
outfile_up_county.write(ucc_string)

outfile_down_county.close()
outfile_up_county.close()
print("All done!")