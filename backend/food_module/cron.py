from firebase_admin import messaging
import firebase_admin
import datetime

firebase_admin.initialize_app()


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
