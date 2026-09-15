from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler


class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def handle_one_request(self):
        try:
            super().handle_one_request()
        except (BrokenPipeError, ConnectionResetError):
            # Cliente fechou a conexao antes do servidor terminar de enviar.
            # Comportamento normal em HTTP (page reload, cancel, etc.).
            self.close_connection = True


class ReusableThreadingHTTPServer(ThreadingHTTPServer):
    allow_reuse_address = True


if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = ReusableThreadingHTTPServer(server_address, CORSRequestHandler)
    print("Serving with CORS on port 8000 (threaded)...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
        httpd.server_close()
