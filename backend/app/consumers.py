import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async
from django.utils import timezone

User = get_user_model()
logger = logging.getLogger(__name__)

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_room_id = self.scope['url_route']['kwargs']['chat_room_id']
        self.room_group_name = f'chat_{self.chat_room_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        logger.debug(f"WebSocket connection established for chat room: {self.chat_room_id}")

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        logger.debug(f"WebSocket connection closed for chat room: {self.chat_room_id}")

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_content  = text_data_json['content']
        user = self.scope['user']

        # Save message to database
        await self.save_message(user, message_content)

        # Broadcast message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'sender': user.username,
                'content': message_content
            }
        )
        logger.debug(f"Received message: {text_data_json}")

    async def chat_message(self, event):
        sender = event['sender']
        content = event['content']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'sender': sender,
            'content': content
        }))
        logger.debug(f"Sending message: {event}")

    @sync_to_async
    def save_message(self, user, content):
        Message.objects.create(
            sender=user,
            chat_room_id=self.chat_room_id,
            content=content,
            timestamp=timezone.now()
        )
        logger.debug(f"Message saved: {content}")
