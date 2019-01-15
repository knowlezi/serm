import datetime


def convert_seconds_to_timestamp(s):
    return str(datetime.timedelta(seconds=int(s)))
