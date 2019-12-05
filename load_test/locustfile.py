from locust import HttpLocust, TaskSet, task
import logging, sys
import csv

USER_CREDENTIALS = None

class LoginWithUniqueUsersSteps(TaskSet):
    email = "NOT_FOUND"
    password = "NOT_FOUND"
    first_name = "NOT_FOUND"
    last_name = "NOT_FOUND"

    def on_start(self):
            if len(USER_CREDENTIALS) > 0:
                self.email, self.password, self.first_name, self.last_name = USER_CREDENTIALS.pop()

    @task
    def register(self):
        self.client.post("/register", {
            'email': self.email, 'password': self.password, 'first_name': self.first_name, 'last_name': self.last_name
        })
        logging.info('Register with %s email and %s password', self.email, self.password)

class LoginWithUniqueUsersTest(HttpLocust):
    task_set = LoginWithUniqueUsersSteps
    host = "https://your-gym.herokuapp.com"
    sock = None
    min_wait = 2 * 1000
    max_wait = 6 * 1000

    def __init__(self):
        super(LoginWithUniqueUsersTest, self).__init__()
        global USER_CREDENTIALS
        if (USER_CREDENTIALS == None):
            with open('mockup_users.csv', 'rb') as f:
                reader = csv.reader(f)
                USER_CREDENTIALS = list(reader)
