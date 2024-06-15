function injectScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

injectScript('https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js')
    .then(() => injectScript('https://www.gstatic.com/firebasejs/8.4.3/firebase-firestore.js'))
    .then(() => {
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID",
            measurementId: "YOUR_MEASUREMENT_ID"
          };

        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        function generateRandomId() {
            return Math.random().toString(36).substr(2, 9);
        }

        async function collectData() {
            // Collect basic info
            const timestamp = new Date().toISOString();
            let ipAddress = '';

            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                ipAddress = data.ip;
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }

            // Collect advanced info
            const userAgent = navigator.userAgent;
            const platform = navigator.platform;
            const language = navigator.language;
            const cookiesEnabled = navigator.cookieEnabled;
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const colorDepth = window.screen.colorDepth;
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const online = navigator.onLine;
            const javaEnabled = navigator.javaEnabled();
            const doNotTrack = navigator.doNotTrack;
            const hardwareConcurrency = navigator.hardwareConcurrency;
            const plugins = Array.from(navigator.plugins).map(plugin => ({
                name: plugin.name,
                filename: plugin.filename,
                description: plugin.description,
            }));
            const mimeTypes = Array.from(navigator.mimeTypes).map(mimeType => ({
                type: mimeType.type,
                description: mimeType.description,
                suffixes: mimeType.suffixes,
            }));
            const deviceMemory = navigator.deviceMemory;
            const vendor = navigator.vendor;
            const appVersion = navigator.appVersion;
            const appCodeName = navigator.appCodeName;
            const product = navigator.product;
            const productSub = navigator.productSub;
            const buildID = navigator.buildID || null;
            const oscpu = navigator.oscpu || null;
            const webdriver = navigator.webdriver;
            const languages = navigator.languages;
            const maxTouchPoints = navigator.maxTouchPoints;

            // Filter properties of mediaCapabilities
            const mediaCapabilities = {
                supported: typeof navigator.mediaCapabilities !== 'undefined',
            };

            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
            const connectionInfo = {
                type: connection.type || 'Not Supported',
                effectiveType: connection.effectiveType || 'Not Supported',
                downlinkMax: connection.downlinkMax || 'Not Supported',
                rtt: connection.rtt || 'Not Supported',
                saveData: connection.saveData || false
            };

            let battery = 'Not Supported';

            if (navigator.getBattery) {
                const batteryData = await navigator.getBattery();
                battery = {
                    charging: batteryData.charging,
                    level: batteryData.level,
                    chargingTime: batteryData.chargingTime,
                    dischargingTime: batteryData.dischargingTime
                };
            }

            const advancedInfoData = {
                userAgent,
                platform,
                language,
                cookiesEnabled,
                screenWidth,
                screenHeight,
                colorDepth,
                timeZone,
                online,
                javaEnabled,
                doNotTrack,
                hardwareConcurrency,
                plugins,
                mimeTypes,
                deviceMemory,
                vendor,
                appVersion,
                appCodeName,
                product,
                productSub,
                buildID,
                oscpu,
                webdriver,
                languages,
                maxTouchPoints,
                mediaCapabilities,
                battery,
                connection: connection !== 'Not Supported' ? connectionInfo : 'Not Supported',
                geolocation: navigator.geolocation ? 'Supported' : 'Not Supported'
            };

            const basicInfoData = {
                ipAddress,
                timestamp
            };

            return { basicInfoData, advancedInfoData };
        }

        async function postData() {
            const randomId = generateRandomId();
            const { basicInfoData, advancedInfoData } = await collectData();
            const epochTime = Math.floor(Date.now() / 1000);
            try {
                await db.collection(epochTime).doc('basicInfo').set(basicInfoData);
                await db.collection(epochTime).doc('advancedInfo').set(advancedInfoData);

                console.log("Documents successfully written with ID: ", epochTime);
            } catch (error) {
                console.error("Error writing document: ", error);
            }
        }

        // Call the postData function
        postData();
    })
    .catch(error => {
        console.error('Error loading Firebase scripts:', error);
    });
