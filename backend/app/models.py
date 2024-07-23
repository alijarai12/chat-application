from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class ChatRoom(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Chat Room'
        verbose_name_plural = 'Chat Rooms'
    
    def __str__(self):
        return self.name
    

class ChatRoomMember(models.Model):
    member = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_room_member')
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='chat_room', db_index=True)


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages', db_index=True)
    content = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    
    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
        ordering = ['timestamp']  # Default ordering by timestamp
    
    def __str__(self):
        return f"{self.sender.username}: {self.content[:50]}"
