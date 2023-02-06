import requests
from firebase_admin import messaging
import firebase_admin
import datetime
from user_module.models import CustomUser
from food_module.models import UserFoodItem, FoodItem
from django.utils import timezone
from firebase_admin.app_check import verify_token

if not firebase_admin._apps:
    firebase_admin.initialize_app()


def send_stale_notification(image_url=None, token=None):
    """returns firebase message object based on notification type"""

    print("sending stale notification to: ", token)

    notification = messaging.Notification(
        title="These food items have gone stale!", body="Click to view", image=image_url
    )

    message = messaging.MulticastMessage(
        notification=notification,
        tokens=[token],
    )

    messaging.send_multicast(message)


def get_food_items():
    print(f"Timestamp: {datetime.datetime.now()}")
    # These registration tokens come from the client FCM SDKs.
    registration_tokens = [
        "dNVXsZuFtmfm-isD-FAIC4:APA91bErCr_Df2qdk3R4tVRx2_HCsSscy0lcItU_0TXZ5loNOR_4kErkxiNp6REEf7cpYpq0NQtkqFt3MDRSDBKZN0SVZdZY_ndZCm6zHnIw8EDbD4lGzk1TeGpullmPX4FfKEds-mtu",
        "e-kNUiUKjOcKSpR211BWBk:APA91bHS9MiakEV4VdFJ7ZvayiQZQyIHB0ORkCbpdSauG9Fskrg2mL3m6G7fUhoj3zLP8d1P1yrtX5oReO_QMFa39g_sUw1HvsQBHqk0xBnLMl8izkK-dniXlXpNXQ7UJ2Bc5D6As8pI",
    ]
    print(f"sending messages to these tokens...: {registration_tokens}")

    notification = messaging.Notification(
        title="test message", body="this is the description"
    )

    message = messaging.MulticastMessage(
        notification=notification,
        tokens=registration_tokens,
    )
    response = messaging.send_multicast(message)
    if response.failure_count > 0:
        responses = response.responses
        failed_tokens = []
        for idx, resp in enumerate(responses):
            if not resp.success:
                # The order of responses corresponds to the order of the registration tokens.
                failed_tokens.append(registration_tokens[idx])
        print("List of tokens that caused failures: {0}".format(failed_tokens))
    print(f"failure count: {response.failure_count}")
    print(f"{response.responses}")
    return True


# request arduino to take a picture hourly for every user
def send_image_request_task():
    users = CustomUser.objects.all()
    print("these are the users: ", users)
    for user in users:
        print("sending image request to arduino")
        response = requests.get(f"http://localhost:5000/api/image/?user={user.email}")

        # 200 means that arduino is available
        if response.status_code == 200:
            print("sent image request for: ", user.email)
        else:
            print("failed image request for: ", user.email)
            print("response data: ", response.data)


# request arduino to get temperature hourly for every user
def send_temperature_request_task():
    users = CustomUser.objects.all()
    print("these are the users: ", users)
    for user in users:
        print("sending temperature request to arduino")
        response = requests.get(
            f"http://localhost:5000/api/temperature/?user={user.email}"
        )

        # 200 means that arduino is available
        if response.status_code == 200:
            print("sent temperature request for: ", user.email)
        else:
            print("failed temperature request for: ", user.email)
            print("response data: ", response.data)


def stale_items_checker_task():
    """
    Task to check stale items periodically, and send notifications to users if any item is stale, create StaleFoodItem objects
    """
    users = CustomUser.objects.all()
    try:
        notif_count = 0
        for user in users:
            stale = []
            user_food_items = UserFoodItem.objects.filter(user=user)

            # get the stale items based on expiry_date
            for item in user_food_items:
                # check if the item has an expiry_time
                if item.food_item.expiry_time is None:
                    continue
                if (
                    item.created_at
                    + datetime.timedelta(days=item.food_item.expiry_time)
                    < timezone.now()
                ):
                    stale.append(item)

            if stale:
                # update the objects
                for i in stale:
                    i.is_stale = True
                    i.save()

                # send notification to user (assuming that the FCM token is valid)
                if user.fcm_token is not None:
                    send_stale_notification(token=user.fcm_token)
                    notif_count += 1

        print("----------- completed stale checker ------------")
        print(f"sent {notif_count} notifications")

    except Exception as e:
        print("Error in stale checker: ", e)
