from rest_framework import serializers
from ..serializers import PostSerializer
from ..models.Incentive_Packages import *
from ..models.Channels_Posts_Events import Post


class IncentiveSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = IncentivePackage

    # post = serializers.PrimaryKeyRelatedField(
    #     read_only=False, many=False, queryset=Post.objects.all())
    post = PostSerializer(many=False, read_only=True)
    diet_option = serializers.PrimaryKeyRelatedField(
        many=True, queryset=DietOption.objects.all())
    incentive_type = serializers.PrimaryKeyRelatedField(
        read_only=False, many=False, queryset=IncentiveChoice.objects.all())


class IncentiveChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = IncentiveChoice


class DietOptionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = DietOption
