function advancedInfo() {
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
    const buildID = navigator.buildID;
    const oscpu = navigator.oscpu;
    const webdriver = navigator.webdriver;
    const languages = navigator.languages;
    const maxTouchPoints = navigator.maxTouchPoints;
    const mediaCapabilities = navigator.mediaCapabilities;
    const battery = navigator.getBattery ? navigator.getBattery() : 'Not Supported';
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || 'Not Supported';
    const geolocation = navigator.geolocation ? 'Supported' : 'Not Supported';
    const computerDetails = {
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
        connection,
        geolocation
    };
    console.log('Computer Details:', computerDetails);
}

function basicInfo() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            console.log('IP Address:', ipAddress);
        })
        .catch(error => console.error('Error fetching IP address:', error));
    const timestamp = new Date().toISOString();
    console.log('Timestamp:', timestamp);
}
advancedInfo();
basicInfo();


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
}

async function postData() {
    const randomId = generateRandomId();

    const basicInfoData = {
        name: "John Doe",
        age: 17,
        email: "johndoe@example.com"
    };

    const advancedInfoData = {
        hobbies: ["reading", "gaming", "coding"],
        skills: ["JavaScript", "Python", "Firebase"]
    };

    try {
        // Add a document with a generated ID to the "basicInfo" collection
        await setDoc(doc(db, "basicInfo", randomId), basicInfoData);

        // Add a document with a generated ID to the "advancedInfo" collection
        await setDoc(doc(db, "advancedInfo", randomId), advancedInfoData);

        console.log("Documents successfully written with ID: ", randomId);
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}

// Call the postData function
postData();
