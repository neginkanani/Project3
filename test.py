import json

with open('data/brewery_untappd_export_MD.json', 'r', encoding="utf8") as myfile:
    data_untappd = myfile.read()

data= json.loads(data_untappd)

import re

string = data[3]["brewery_location"]
pattern = r",\s*([A-Za-z]+)$"

match = re.search(pattern, string)
if match:
    country = match.group(1)
    print(country)