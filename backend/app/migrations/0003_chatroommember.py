# Generated by Django 5.0.6 on 2024-07-20 12:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_remove_chatroom_members'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatRoomMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chat_room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chat_room', to='app.chatroom')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chat_room_member', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]