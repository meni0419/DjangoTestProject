from django.db import models


class Message(models.Model):
    id_chat = models.BigIntegerField(null=True, blank=True)  # Optional for non-Telegram inputs
    platform = models.CharField(max_length=50)  # Example: 'web' or 'telegram'
    lang = models.CharField(max_length=10)  # Example: 'ua', 'ru'
    message = models.TextField()  # Transliterated text
    created_at = models.DateTimeField(auto_now_add=True)  # Auto-generated timestamp
