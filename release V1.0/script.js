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
    .then(() => injectScript('/data/config.js'))
    .then(() => {
        const app = firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        async function collectData() {
            const timestamp = new Date().toISOString();
            let ipAddress = '';

            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                ipAddress = data.ip;
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }

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
            const { basicInfoData, advancedInfoData } = await collectData();
            const epochTime = Math.floor(Date.now() / 1000);
            try {
                await db.collection(epochTime.toString()).doc('basicInfo').set(basicInfoData);
                await db.collection(epochTime.toString()).doc('advancedInfo').set(advancedInfoData);

                console.log("Documents successfully written with ID: ", epochTime);
            } catch (error) {
                console.error("Error writing document: ", error);
            }
        }

        postData();
    })
    .catch(error => {
        console.error('Error loading Firebase scripts:', error);
    });
