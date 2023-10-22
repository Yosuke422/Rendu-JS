#using requests module to post data to a website
import requests
import json

url = 'http://localhost:3000/pkm'
payload = {'name': 'inconnu', 'type': 'feu', 'level': 100}
headers = {'content-type' : 'application/json'}

r = requests.post(url, data=json.dumps(payload), headers=headers)
print(r.text)