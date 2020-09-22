from gevent.pywsgi import WSGIServer
from gevent import monkey   

#monkey.patch_all()

from app import app

if __name__ == "__main__" :
    app.run(host='0.0.0.0', port=5000, debug=True)

    # Serve the app with gevent
    
    # http_server = WSGIServer(('0.0.0.0', 5000), app)
    # http_server.serve_forever()