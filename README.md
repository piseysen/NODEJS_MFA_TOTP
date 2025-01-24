# NODEJS_MFA_TOTP

## Purpose of the Project

TOTP, or Time-based One-Time Password, is a type of one-time password (OTP) that is generated based on the current time and a shared secret key. It is widely used for two-factor authentication (2FA) to enhance security for online accounts and services.

Key Features of TOTP:
1. **Time-Based**: TOTP generates a new password at regular intervals, typically every 30 seconds. This means that the password is only valid for a short period, reducing the risk of it being intercepted and reused.
2. **One-Time Use**: Each TOTP is valid for a single use. Once it has been used, it cannot be reused, which adds an extra layer of security.
3. **Shared Secret**: TOTP relies on a shared secret key that is known only to the server and the user’s authentication device (e.g., a mobile app like Google Authenticator or Microsoft Authenticator). This secret is used in conjunction with the current time to generate the OTP.
4. **Algorithm**: TOTP is based on the HMAC-SHA1 algorithm, which combines the shared secret with the current time (in a specific time window) to produce a unique code.

## How to Implement

1. **Clone the Project:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Install Dependencies:
   ```sh
    npm install
    ```

3. Set Up Environment Variables: Create a .env file in the root directory and add the following:

   ```sh
    PORT=7001
    SESSION_SECRET=secret
    JWT_SECRET=secret
    CONNECTION_STRING=<your-mongodb-connection-string>
    ```
4. Run the Project:

    ```sh
    npm run dev
    ```

### How to Test API

1. Register a User:

    POST /api/auth/register
    {
        "username": "your-username",
        "password": "your-password"
    }

2. Login a User:

    POST /api/auth/login
    {
        "username": "your-username",
        "password": "your-password"
    }

3. Check Authentication Status:

    GET /api/auth/status

4. Logout a User:

   GET /api/auth/logout

5. Setup 2FA:

   POST /api/auth/2fa/setup

6. Verify 2FA:

   POST /api/auth/2fa/verify
    {
        "token": "your-totp-token"
    }

7. Reset 2FA:

   POST /api/auth/2fa/reset


### How to Test with Google Authenticator

1. Setup 2FA:

    . After logging in, send a POST request to /api/auth/2fa/setup.
    . You will receive a QR code URL in the response.

2. Scan QR Code:

    . Open Google Authenticator on your mobile device.
    . Scan the QR code provided in the response.

3. Verify 2FA:

    . Generate a TOTP using Google Authenticator.
    . Send a POST request to /api/auth/2fa/verify with the generated token: