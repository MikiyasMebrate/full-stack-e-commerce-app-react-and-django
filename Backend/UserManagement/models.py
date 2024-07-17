from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.hashers import make_password


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **other_fields):
       if not email:
            raise ValueError('Users must have an email address')
       else:
            other_fields.setdefault('is_active', True)  # Example default
            hashed_password = make_password(password)
            user = self.model(email=email, password=hashed_password, **other_fields)
            user.save()
            return user

    def create_superuser(self, email, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be a staff user.')

        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be a superuser.')

        return self.create_user(email, password, **other_fields)
    

class CustomUser(AbstractUser):
    avatar = models.ImageField(upload_to=None)
    username = None
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]

    objects = CustomUserManager()  
    

