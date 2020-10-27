# Start server

```bash
node index.js
```

# HTTP Pie

```bash
# GET LAN IP
arp -a   | grep 192       | grep permanent
ifconfig | grep "inet"    | grep -v "127.0.0.1"
ifconfig | grep "netmask" | grep -v "127.0.0.1"

# In my situation, the LAN IP is 192.168.1.189
http -ph -f POST 'http://192.168.1.189/upload' UPLOADING_FILE@THE_FILE_TO_BE_UPLOAD
```
