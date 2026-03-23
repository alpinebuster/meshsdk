#!/usr/bin/env python

import sys
import os

from http import server


class MRHTTPRequestHandler(server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_my_headers()

        server.SimpleHTTPRequestHandler.end_headers(self)

    def send_my_headers(self):
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")


def run(server_class=server.HTTPServer, handler_class=MRHTTPRequestHandler, port=9310):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Server is running on `http://localhost:{port}`!")
    print("Current directory:", os.getcwd())
    print("Directory contents:", os.listdir("."))
    httpd.serve_forever()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 9310
    run(port=port)
