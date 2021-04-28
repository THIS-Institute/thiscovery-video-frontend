from functools import wraps

def decodes_response(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        response = function(*args, **kwargs)

        if response.ok:
            try:
                return response.json()
            except ValueError:
                return response.text

        return response

    return wrapper
