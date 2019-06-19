from .models import *
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['first_name', 'middle_name',
                    'email', 'is_staff', 'username']
    list_filter = ['first_name', 'middle_name',
                   'email', 'is_staff', 'username']
    fieldsets = (
        (None, {'fields': (
            'username', 'email', 'password', 'first_name', 'middle_name', 'last_name', 'birth_date',  'is_superuser', 'interests')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(Community)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Post)
admin.site.register(ContentChannel)
admin.site.register(Interest)
admin.site.register(Subscribe)
admin.site.register(PostEvent)
admin.site.register(EventContent)
admin.site.register(IncentivePackage)
admin.site.register(UsedBy)
admin.site.register(View)
admin.site.register(DietOption)
admin.site.register(IncentiveChoice)
admin.site.register(AttendanceStrike)
admin.site.register(Attend)
admin.site.register(Rate)
