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

    print("\nIn verify decode 1\n")

    jsonurl = urlopen(
        f'https://{os.environ["AUTH0_DOMAIN"]}/.well-known/jwks.json')

    print("\nIn verify decode 2\n")

    jwks = json.loads(jsonurl.read())

    print(f"\nIn verify decode 3: {token}\n")
    print("jwks:", jwks)

    unverified_header = jwt.get_unverified_header(token)

    print(f"\nIn verify decode 4: {unverified_header}\n")

    rsa_key = {}

    if 'kid' not in unverified_header:
        abort(401)

    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']
            }

    print(f"\nIn verify decode 5: {rsa_key}\n")

    auth = request.headers.get("Authorization", None)
    print(f"\n\n\nauth: {auth}\n\n\n")

    if rsa_key:
        try:
            return jwt.decode(
                token,
                rsa_key,
                algorithms=[os.environ["ALGORITHM"]],
                audience=os.environ["API_AUDIENCE"],
                # audience=os.environ["AUTH0_CLIENT_ID"],
                issuer=('https://' + os.environ["AUTH0_DOMAIN"] + '/')
            )
        except jwt.ExpiredSignatureError:
            print("\n\nExpired Signature!!!\n\n")
            abort(401)
        except jwt.JWTClaimsError as error:
            print(f"\n\nUnsuccessful JWT!!! 4\n\n, {error}")
            print(f"audience: {os.environ['API_AUDIENCE']}")
            print(f"issuer: {'https://' + os.environ['AUTH0_DOMAIN']}")
            abort(401)
        except Exception as error:
            print(f"\n\nerror seen: {error}")
            abort(400)

    print("\n\nGeneral error!\n\n")

    abort(400)


def check_permissions(permission, payload):
    """
    Note: this function is largely based on the function for checking
    permission in the BasicFlaskAuth folder from the course on authentication
    taught by Gabriel Ruttner
    """

    print(f"\n\nattempted permission: {permission}\n\n")
    
    if 'permissions' not in payload:
        print("\n\nNo permissions key!\n\n")
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
            print("\n\n\ntoken found: ", token)
            try:
                payload = verify_decode_jwt(token)
                print(f"\n\npayload result: {payload}\n\n")
                print("\n\n\n")
                unverified_claims = jwt.get_unverified_claims(token)
                print(f"unverified_claims: {unverified_claims}")
            except Exception:
                abort(401)

            check_permissions(permission, payload)

            print("\n\ncheck permissions succeeded\n\n")
            
            return f(payload, *args, **kwargs)
        return wrapper
    return requires_auth_decorator
