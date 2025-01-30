import network
import uasyncio as asyncio
from microdot import Microdot, Response
import os
import time  # Added import

def read_password():
    with open("secret.txt") as f:
        return f.read().strip()

def connectWifi():
    ssid = "Magenta_cb0401_259f2b"
    password = read_password()

    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)

    max_wait = 10
    print("Connecting to Wi-Fi", end="")
    while max_wait > 0:
        if wlan.isconnected():
            break
        print(".", end="")
        max_wait -= 1
        time.sleep(1)
    
    if not wlan.isconnected():
        status = wlan.status()
        error_msg = {
            network.STAT_IDLE: "Idle",
            network.STAT_CONNECTING: "Connecting",
            network.STAT_WRONG_PASSWORD: "Wrong password",
            network.STAT_NO_AP_FOUND: "AP not found",
            network.STAT_CONNECT_FAIL: "Connection failed"
        }.get(status, f"Unknown error: {status}")
        raise RuntimeError(f"Wi-Fi failed: {error_msg}")
    
    ip = wlan.ifconfig()[0]
    print(f"\nConnected! IP: {ip}")


#------------------------------------------------------------------------------

app = Microdot()
Response.default_content_type = 'text/html'

@app.route('/')
async def index(req):
    try:
        with open("sites/index.html", "r") as f:
            return f.read()
    except OSError:
        return "Error: index.html not found!", 404

@app.route('/styles/<filename>')
async def static_file(req, filename):
    try:
        file_path = f"styles/{filename}"
        with open(file_path, "r") as f:
            content = f.read()
        # Explicitly set the Content-Type header for CSS files
        return Response(body=content, headers={'Content-Type': 'text/css'})
    except OSError:
        return "Error: file not found!", 404

async def main():
    connectWifi()
    await app.start_server(port=80)

asyncio.run(main())