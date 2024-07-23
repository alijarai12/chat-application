from django.urls import path
from . import views
from .views import ChatRoomListView,AddUserToChatRoomView, ChatRoomDetailView, ListJoinedChatRoom, MessageViewSet, create_chatroom

urlpatterns = [
    # path('', views.index),
    path('chatrooms/', ChatRoomListView.as_view(), name='chatroom-list'),
    path('chatrooms/<int:pk>/', ChatRoomDetailView.as_view(), name='chatroom-detail'),

    path('add-chatrooms/', create_chatroom, name='add_create_chatroom'),
    path('chatrooms/add_user/', AddUserToChatRoomView.as_view(), name='add-user-to-chatroom'),

    path('chatrooms/list-joined-chat-rooms/', ListJoinedChatRoom.as_view(), name='list-joined-chat-rooms'),

    path('chatrooms/messages/<int:chat_room_id>/', MessageViewSet.as_view({'get': 'list', 'post': 'create'}), name='message-list'),
    
]