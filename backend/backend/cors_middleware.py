# cors_middleware.py

class CORSMiddleware:
    def __init__(self, app, allow_all=True):
        self.app = app
        self.allow_all = allow_all

    async def __call__(self, scope, receive, send):
        if scope['type'] == 'http':
            async def send_wrapper(message):
                if message['type'] == 'http.response.start':
                    headers = dict(message.get('headers', []))
                    if self.allow_all:
                        headers[b'access-control-allow-origin'] = b'*'
                        headers[b'access-control-allow-credentials'] = b'true'
                        headers[b'access-control-allow-methods'] = b'GET, POST, PUT, DELETE, OPTIONS'
                        headers[b'access-control-allow-headers'] = b'Content-Type, Authorization'
                    message['headers'] = list(headers.items())
                await send(message)
            await self.app(scope, receive, send_wrapper)
        else:
            await self.app(scope, receive, send)
