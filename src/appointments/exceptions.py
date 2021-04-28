class InvalidTimeslot(Exception):
    """Timeslot is invalid."""

class BookingError(Exception):
    """There was a booking error."""

class CancellationError(Exception):
    """There was a cancellation error."""
