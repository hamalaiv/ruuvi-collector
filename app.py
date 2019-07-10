import subprocess
import time

while True:
    result = subprocess.check_call('node app.js', shell=True)
    print("%s result: %s" % (time.strftime("%d.%m %H:%M:%S"), result))
    time.sleep(900)