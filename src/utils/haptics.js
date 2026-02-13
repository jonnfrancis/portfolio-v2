// Lightweight haptics helper for web (navigator.vibrate) with graceful fallbacks
// Provides simple presets and an enabled toggle stored in localStorage.

const STORAGE_KEY = "haptics.enabled";

const hasVibrate =
    typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

function isEnabled() {
    try {
        const v = localStorage.getItem(STORAGE_KEY);
        if (v === null) return true; // default enabled
        return v === "1";
    } catch (e) {
        console.log("Error accessing localStorage for haptics:", e);
        return true;
    }
}

function setEnabled(value) {
    try {
        localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
    } catch (e) {
        // noop
        console.log("Error setting localStorage for haptics:", e);
    }
}

function vibrate(pattern) {
    if (!isEnabled()) return false;
    try {
        // navigator.vibrate accepts a number or an array of numbers
        if (hasVibrate) {
            navigator.vibrate(pattern);
            return true;
        }

        // graceful DOM fallback: briefly add a class to trigger visual pulse
        fallbackPulse();
        return false;
    } catch (e) {
        console.log("Error calling navigator.vibrate:", e);
        return false;
    }
}

let _fallbackTimer = null;
function fallbackPulse(duration = 160) {
    try {
        const root = document && document.documentElement
        if (!root) return
        root.classList.add('haptic-fallback')
        if (_fallbackTimer) clearTimeout(_fallbackTimer)
        _fallbackTimer = setTimeout(() => {
            try { root.classList.remove('haptic-fallback') } catch(e) {
                console.log("Error removing haptic fallback class:", e);
            }
            _fallbackTimer = null
        }, duration)
    } catch (e) {
        console.log("Error in fallbackPulse:", e);
    }
}

// Preset convenience methods
function impact(style = "light") {
    // Map to short vibration durations
    switch (style) {
        case "light":
            return vibrate(10);
        case "medium":
            return vibrate(30);
        case "heavy":
            return vibrate(60);
        default:
            return vibrate(20);
    }
}

function notification(type = "success") {
    // Use simple patterns for different notification types
    switch (type) {
        case "success":
            return vibrate([10, 30, 10]);
        case "warning":
            return vibrate([30, 20, 30]);
        case "error":
            return vibrate([60, 40, 60]);
        default:
            return vibrate(20);
    }
}

export default {
    hasSupport: hasVibrate,
    isEnabled,
    setEnabled,
    vibrate,
    impact,
    notification,
};

export { hasVibrate, isEnabled, setEnabled, vibrate, impact, notification };
