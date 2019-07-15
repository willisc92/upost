"""
Django settings for upost_api project.

Generated by 'django-admin startproject' using Django 2.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
if 'IS_CLOUD_DEPLOYMENT' in os.environ:
    SECRET_KEY = os.environ['SECRET_KEY']
else:
    try:
        from .local_settings import *
    except ImportError:
        raise Exception(
            "A local_settings.py file is required to run this project")

    SECRET_KEY = S_KEY

# SECURITY WARNING: don't run with debug turned on in production!
if 'IS_CLOUD_DEPLOYMENT' in os.environ:
    DEUBG = False
else:
    DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'rest_framework',
    # 'rest_auth',
    # 'rest_framework.authtoken',
    'corsheaders',
    'upost.apps.UpostConfig',
    'django_filters',
    'frontendapp',
    'oauth2_provider',
    'social_django',
    'rest_framework_social_oauth2'
]

SITE_ID = 1

OAUTH2_PROVIDER = {
    'ACCESS_TOKEN_EXPIRE_SECONDS': 60 * 60,
    'OAUTH_SINGLE_ACCESS_TOKEN': True,
    'OAUTH_DELETE_EXPIRED': True,
    'REFRESH_TOKEN_EXPIRE_SECONDS': 0,
    'REFRESH_TOKEN_GRACE_PERIOD_SECONDS': 0
}


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'rest_framework.authentication.TokenAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework_social_oauth2.authentication.SocialAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.IsAuthenticatedOrReadOnly',
        'rest_framework.permissions.AllowAny',
        # 'rest_framework.permissions.IsAuthenticated'
    ],
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
}

AUTHENTICATION_BACKENDS = (
    'rest_framework_social_oauth2.backends.DjangoOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'oauth2_provider.middleware.OAuth2TokenMiddleware'
]

AUTH_USER_MODEL = 'upost.CustomUser'

SILENCED_SYSTEM_CHECKS = ['mysql.E001']

ROOT_URLCONF = 'upost_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'upost_api.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases
if 'IS_CLOUD_DEPLOYMENT' in os.environ:
    DATABASES = {
        'default': {
            # 'ENGINE': 'mysql.connector.django',
            'ENGINE': 'django.db.backends.mysql',
            'NAME': os.environ['RDS_DB_NAME'],
            'USER': os.environ['RDS_USERNAME'],
            'PASSWORD': os.environ['RDS_PASSWORD'],
            'HOST': os.environ['RDS_HOSTNAME'],
            'PORT': os.environ['RDS_PORT'],
        }
    }
else:
    try:
        from .local_settings import *
    except ImportError:
        raise Exception(
            "A local_settings.py file is required to run this project")

    DATABASES = {
        'default': {
            # 'ENGINE': 'mysql.connector.django',
            'ENGINE': 'django.db.backends.mysql',
            'NAME': DB_NAME,
            'USER': 'root',


                    'PASSWORD': DB_PASSWORD,

                    'HOST': '127.0.0.1',
                    'PORT': '3306',
            # 'OPTIONS': {
            #     'use_pure': 'true'
            # }
        }
    }

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Edmonton'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATICFILES_DIRS = [os.path.join(
    BASE_DIR, 'frontendapp', 'static', 'frontend')]
STATICFILES_STORAGE = (
    'whitenoise.storage.CompressedManifestStaticFilesStorage')


STATIC_URL = '/dist/'

STATIC_ROOT = os.path.join(BASE_DIR, 'dist')

# WHITENOISE_ROOT = os.path.join(BASE_DIR, 'frontendapp', 'dist', 'root')  # serves assets at application root
WHITENOISE_MAX_AGE = 3600


# Media fields
# https://docs.djangoproject.com/en/2.2/ref/models/fields/#imagefield

if 'IS_CLOUD_DEPLOYMENT' in os.environ:
    AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
    AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
    AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
    AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
    AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=3600'}
    DEFAULT_FILE_STORAGE = "upost_api.storage_backends.MediaStorage"
    AWS_DEFAULT_ACL = None

MEDIA_ROOT = 'upost/media/'
MEDIA_URL = '/media/'

CORS_ORIGIN_ALLOW_ALL = True
CSRF_COOKIE_NAME = "csrftoken"

# Email fields

EMAIL_BACKEND = 'django_ses.SESBackend'
AWS_SES_REGION_NAME = 'us-west-2'
AWS_SES_REGION_ENDPOINT = 'email.us-west-2.amazonaws.com'
DEFAULT_FROM_EMAIL = 'UPost Team <noreply@upostwebsite.com>'

if 'IS_CLOUD_DEPLOYMENT' in os.environ:
    DOMAIN_NAME = 'upostwebsite.com'
    AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
    AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
else:
    try:
        from .local_settings import *
    except ImportError:
        raise Exception(
            "A local_settings.py file is required to run this project")
    DOMAIN_NAME = 'localhost:8080'
