from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import ChatRoom, ChatRoomMember, Message
from .serializers import ChatRoomSerializer,ChatRoomListSerializer, AddUserToChatRoomSerializer, MessageSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


# Create your views here.


@api_view(['POST'])
def create_chatroom(request):
    serializer = ChatRoomSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatRoomListView(generics.ListAPIView):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    
class ChatRoomDetailView(generics.RetrieveAPIView):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

    
class ListJoinedChatRoom(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        # Fetch distinct chat room IDs the user is a member of
        chat_room_ids = ChatRoomMember.objects.filter(member=user).values_list('chat_room_id', flat=True).distinct()
        chat_rooms = ChatRoom.objects.filter(id__in=chat_room_ids)
        serializer = ChatRoomListSerializer(chat_rooms, many=True)
        return Response(serializer.data)


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        chat_room_id = self.kwargs['chat_room_id']
        return Message.objects.filter(chat_room_id=chat_room_id).order_by('timestamp')

    def perform_create(self, serializer):
        chat_room_id = self.kwargs['chat_room_id']
        serializer.save(sender=self.request.user, chat_room_id=chat_room_id)

class AddUserToChatRoomView(generics.CreateAPIView):
    serializer_class = AddUserToChatRoomSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        chat_room_id = request.data.get('chat_room')
        
        try:
            chat_room = ChatRoom.objects.get(id=chat_room_id)
        except ChatRoom.DoesNotExist:
            return Response({"error": "Chat room does not exist"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user is already a member of the chat room
        if ChatRoomMember.objects.filter(member=user, chat_room=chat_room).exists():
            return Response({"error": "User is already a member of the chat room"}, status=status.HTTP_400_BAD_REQUEST)

        # Add the user to the chat room
        ChatRoomMember.objects.create(member=user, chat_room=chat_room)
        return Response({"message": "User added to the chat room"}, status=status.HTTP_201_CREATED)
    
