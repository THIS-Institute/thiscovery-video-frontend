import os, sys
import json
import concurrent.futures
from datetime import datetime, timedelta
from pytz import timezone

class Timeslots:
    def __init__(self, acuity_client):
        self.acuity = acuity_client
        self.tz_london = timezone('Europe/London')

    def get_batch_dates(self, days, date_offset, appointment_type_id):
        date = date_offset
        query_dates = []

        for i in range(days):
            date += timedelta(days=1)
            query_dates.append(date)

        dates = {}

        with concurrent.futures.ThreadPoolExecutor() as executor:
            date_futures = { 
                executor.submit(self.get_date, date, appointment_type_id): date for date in query_dates
            }
            
            for future in concurrent.futures.as_completed(date_futures):
                date = date_futures[future]
                dates[date.strftime('%Y%m%d')] = future.result()

        sorted_dates = self.sort_dictionary_by_date(dates)
        timeslots = list(sorted_dates.values())

        if timeslots[0]:
            timeslots[0]['limit'] = True

        return timeslots

    def get_date(self, date, appointment_type_id):
        result = self.acuity.get_availability_times(
            appointment_type_id=appointment_type_id,
            date=date.strftime('%Y-%m-%d')
        )

        response = self.build_date_response(
            date=date,
            result=result,
        )

        return response

    def build_date_response(self, date, result):
        available = self.get_available_timeslots(result)

        start_hour = int(os.environ['APPOINTMENT_START_HOUR'])
        end_hour = int(os.environ['APPOINTMENT_END_HOUR'])
        interval_minutes = int(os.environ['APPOINTMENT_INTERVAL_MIN'])

        next_date = date + timedelta(days=1)
        
        timeslots = self.build_timeslots(
            date=self.tz_london.localize(date),
            available_timeslots=available,
            start_hour=start_hour,
            end_hour=end_hour,
            interval_minutes=interval_minutes,
        )

        return {
            'date': date.strftime('%Y-%m-%d'),
            'next': next_date.strftime('%Y-%m-%d'),
            'limit': False,
            'timeslots': timeslots,
        }

    def get_available_timeslots(self, result):
        available = set()

        for timeslot in result:
            time = self.parse_time(timeslot['time'])
            available.add(time.strftime('%H%M'))
    
        return available

    def build_timeslots(self, date, available_timeslots, start_hour, end_hour, interval_minutes):
        current_time = date.replace(hour=start_hour, minute=0, second=0, microsecond=0)
        day_end = date.replace(hour=end_hour, minute=0, second=0, microsecond=0)

        timeslots = []

        while current_time <= day_end:
            timeslot = {
                'time': current_time.strftime('%Y-%m-%dT%H:%M:%S%z'),
                'available': current_time.strftime('%H%M') in available_timeslots,
            }

            timeslots.append(timeslot)
            current_time += timedelta(minutes=interval_minutes)

        return timeslots

    def sort_dictionary_by_date(self, dates_dict):
        sorted_keys = sorted(dates_dict.keys())
        sorted_dictionary = {}
        
        for key in sorted_keys:
            sorted_dictionary[key] = dates_dict[key]

        return sorted_dictionary

    def parse_time(self, response_time):
        return datetime.strptime(response_time, '%Y-%m-%dT%H:%M:%S%z')
