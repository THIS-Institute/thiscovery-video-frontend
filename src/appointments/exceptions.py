class InvalidTimeslot(Exception):
    """Timeslot is invalid."""

class BookingError(Exception):
    """There was a booking error."""

class AppointmentNotFound(Exception):
    """The appointment id was not found."""

class CancellationError(Exception):
    """There was a cancellation error."""
