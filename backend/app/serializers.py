
from rest_framework import serializers
from .models import ChatRoom, ChatRoomMember, Message


class ChatRoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChatRoom
        fields = '__all__'
        read_only_fields = ['created_at']


class ChatRoomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['id', 'name', 'created_at']

class ChatRoomMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoomMember
        fields = ['id', 'member', 'chat_room']

class AddUserToChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoomMember
        fields = ['chat_room']


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_name', 'chat_room', 'content', 'timestamp']

    def get_sender_name(self, obj):
        return obj.sender.username 