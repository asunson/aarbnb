from datetime import datetime


def date_to_iso_string(date: datetime) -> str: 
    return date.strftime("%Y-%m-%d")


def iso_string_to_date(date_string: str) -> datetime: 
    return datetime.strptime(date_string, "%Y-%m-%d")
