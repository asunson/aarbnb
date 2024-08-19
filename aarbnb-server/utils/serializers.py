from datetime import datetime


def date_to_iso_string(date: datetime) -> str: 
    return datetime.strptime(date, "%Y-%m-%d")