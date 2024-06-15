# lemonLogger🚀

## Requirements
To run this script, ensure you have the following:

- Javascript🔧
- Customised CORS policy📚

## Compatibility
This script is compatible with all devices. 💻

## Description
Lemon Logger is a lightweight JavaScript library for logging user data to Firebase Firestore. It provides an easy way to collect basic and advanced user information and store it securely in a Firebase database🔧

## Instructions

### Configuration
Before using Lemon Logger, you need to set up your Firebase configuration. Follow these steps:

1. Create a Firebase project on the Firebase Console.
2. Navigate to your project settings and find your Firebase configuration object.
3. Save your Firebase configuration object in a file named config.js under the /data directory in your project.

Example Firebase configuration object (in `/data/config.js`):
```javascript
// data/config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

### Usage
To use Lemon Logger in your project, simply include the following script tag with the `defer` attribute in your HTML file:

```html
<script src="https://cdn.jsdelivr.net/gh/lemonscripting/lemonLogger/<version>.js" defer></script>
```

Once you have included the Lemon Logger script and set up your Firebase configuration, Lemon Logger will automatically start collecting user data and logging it to your Firebase Firestore database.

## Disclaimer
This script is for **educational purposes only**. The author does not endorse or encourage any **illegal or unethical activities**. The author is not responsible for any **harm or damage** caused by the use of this script. Use at **your own risk**.

This script should be used only in **controlled environments** and with **appropriate permissions** from the owners of the system or data being manipulated. The user **assumes all responsibility** for any **consequences** that may result from the use of this script. The author cannot be held liable for any **misuse or unethical use** of this script by the user.

By using this script, you agree to **take full responsibility** for your actions and to comply with all **applicable laws and regulations**. If you do not agree with these terms, **do not use this script**.

**Nothing** in this repository constitutes legal advice. The individuals appearing in this presentation, if any, are depicted for **illustrative purposes only** and are presumed innocent until proven guilty in a court of law. 

## Changelog

# V1.0
- initial commit🚀
- added advertisment detection🔍
- added auto skipper⏭️
- added production.min.js📦
- added bookmarklet version🔖

# V1.1
- added message broadcast when ad is blocked📢
- uses vw and vh for dynamic styling📐

# V1.2
- updated stylings📐

# V1.3
- remove adblock alert🚫
- added hide advertisement👀
- added mute advertisement🔇

# V1.4
- updated hooks✅
- fixed ad skip not working🛠️
- added user customisation🎨
- cleaned up code🧹
- added mute when playing ad🔇

## License
```
BSD 3-Clause License

Copyright (c) 2023, lemonscripting

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```