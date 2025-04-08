from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.conf import settings
from pymongo import MongoClient
from datetime import timedelta
from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activity, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        # Connect to MongoDB
        client = MongoClient(settings.DATABASES['default']['HOST'], settings.DATABASES['default']['PORT'])
        db = client[settings.DATABASES['default']['NAME']]

        # Drop existing collections
        db.users.drop()
        db.teams.drop()
        db.activity.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create users
        users = [
            User(id=ObjectId(), email='thundergod@mhigh.edu', name='Thor'),
            User(id=ObjectId(), email='metalgeek@mhigh.edu', name='Tony Stark'),
            User(id=ObjectId(), email='zerocool@mhigh.edu', name='Steve Rogers'),
            User(id=ObjectId(), email='crashoverride@hmhigh.edu', name='Bruce Banner'),
            User(id=ObjectId(), email='sleeptoken@mhigh.edu', name='Natasha Romanoff'),
        ]
        User.objects.bulk_create(users)

        # Create teams
        teams = [
            Team(id=ObjectId(), name='Blue Team'),
            Team(id=ObjectId(), name='Gold Team'),
        ]
        Team.objects.bulk_create(teams)

        # Create activities
        activities = [
            Activity(id=ObjectId(), user=users[0], type='Cycling', duration=60),
            Activity(id=ObjectId(), user=users[1], type='Crossfit', duration=120),
            Activity(id=ObjectId(), user=users[2], type='Running', duration=90),
            Activity(id=ObjectId(), user=users[3], type='Strength', duration=30),
            Activity(id=ObjectId(), user=users[4], type='Swimming', duration=75),
        ]
        Activity.objects.bulk_create(activities)

        # Create leaderboard entries
        leaderboard_entries = [
            Leaderboard(id=ObjectId(), team=teams[0], score=100),
            Leaderboard(id=ObjectId(), team=teams[1], score=90),
        ]
        Leaderboard.objects.bulk_create(leaderboard_entries)

        # Create workouts
        workouts = [
            Workout(id=ObjectId(), name='Cycling Training', description='Training for a road cycling event'),
            Workout(id=ObjectId(), name='Crossfit', description='Training for a crossfit competition'),
            Workout(id=ObjectId(), name='Running Training', description='Training for a marathon'),
            Workout(id=ObjectId(), name='Strength Training', description='Training for strength'),
            Workout(id=ObjectId(), name='Swimming Training', description='Training for a swimming competition'),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))
