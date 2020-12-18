from flask import abort, request
from urllib.request import urlopen
from jose import jwt
import json
import os
from functools import wraps


def get_token_auth_header():
    """Gets access token from authorization header

    Note: this function is largely based on the authorization function provided
    in the BasicFlaskAuth folder from the course on authentication taught by
    Gabriel Ruttner
    """
    auth = request.headers.get('Authorization', None)

    if not auth:
        abort(401)

    parts = auth.split()
    if parts[0].lower() != 'bearer' or len(parts) != 2:
        abort(401)

    token = parts[1]

    return token


def verify_decode_jwt(token):
    """
    Note: this function is largely based on the verification and decoding
    function for jwts in the BasicFlaskAuth folder from the course on
    authentication taught by Gabriel Ruttner
    """
    print("\n1\n")
    jsonurl = urlopen(
        f'https://{os.environ["AUTH0_DOMAIN"]}/.well-known/jwks.json')
    jwks = json.loads(jsonurl.read())
    print("\n2\n")
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    print("\n3\n")

    if 'kid' not in unverified_header:
        abort(401)

    print("\n4\n")

    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']
            }
    
    print("\n5\n")

    if rsa_key:
        print("\n6\n")

        try:
            print("\n7\n")
            return jwt.decode(
                token,
                rsa_key,
                algorithms=[os.environ["ALGORITHM"]],
                audience=os.environ["API_AUDIENCE"],
                issuer='https://' + os.environ["AUTH0_DOMAIN"] + '/'
            )
            print("\n8\n")
        except jwt.ExpiredSignatureError:
            abort(401)
        except jwt.JWTClaimsError:
            abort(401)
        except Exception:
            abort(400)
    abort(400)


def check_permissions(permission, payload):
    """
    Note: this function is largely based on the function for checking
    permission in the BasicFlaskAuth folder from the course on authentication
    taught by Gabriel Ruttner
    """
    if 'permissions' not in payload:
        abort(400)

    if permission not in payload['permissions']:
        abort(403)

    return True


def requires_auth(permission=""):
    """
    Note: this function is largely based on the authorization wrapper header
    from the BasicFlaskAuth folder from the course on authentication taught by
    Gabriel Ruttner
    """
    def requires_auth_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = get_token_auth_header()
            try:
                payload = verify_decode_jwt(token)
            except Exception:
                abort(401)
            check_permissions(permission, payload)
            return f(payload, *args, **kwargs)
        return wrapper
    return requires_auth_decorator
