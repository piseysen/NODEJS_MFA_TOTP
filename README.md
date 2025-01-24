# NODEJS_MFA_TOTP
TOTP, or Time-based One-Time Password, is a type of one-time password (OTP) that is generated based on the current time and a shared secret key. It is widely used for two-factor authentication (2FA) to enhance security for online accounts and services

Key Features of TOTP
1. Time-Based: TOTP generates a new password at regular intervals, typically every 30 seconds. This means that the password is only valid for a short period, reducing the risk of it being intercepted and reused.

2. One-Time Use: Each TOTP is valid for a single use. Once it has been used, it cannot be reused, which adds an extra layer of security.

3. Shared Secret: TOTP relies on a shared secret key that is known only to the server and the user’s authentication device (e.g., a mobile app like Google Authenticator or Microsoft Authenticator). This secret is used in conjunction with the current time to generate the OTP.

4. Algorithm: TOTP is based on the HMAC-SHA1 algorithm, which combines the shared secret with the current time (in a specific time window) to produce a unique code.


Testing this project:

1. Checkout project
2. Use vs code to open the project
3. npm install
4. npm run dev
