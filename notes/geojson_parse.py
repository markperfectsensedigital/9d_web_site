#!/usr/bin/python3.6

import json
import sys
import os

basename = os.path.splitext(sys.argv[1])[0]
new_filename = basename + "_parsed.geojson"

with open (sys.argv[1], 'r') as f:
	hugefile = json.load(f)

parsed = json.dumps(hugefile, indent=2)

outfile = open(new_filename, "w")
outfile.write(parsed)
outfile.close()

print ("All done. Parsed file in " + new_filename)
