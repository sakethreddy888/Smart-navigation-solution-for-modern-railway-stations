document.addEventListener("DOMContentLoaded", function () {
    const translations = {
        en: {
            header: "Railway Station Help Center",
            help: "Help Desk",
            faq: "Frequently Asked Questions",
            contact: "Contact Us",
            assistance: "Our staff is available 24/7 to assist you with tickets, train schedules, and station inquiries.",
            howToBook: "How can I book a ticket?",
            bookOnline: "You can book tickets online or at the station counter.",
            findSchedule: "Where can I find train schedules?",
            scheduleInfo: "Train schedules are available at the inquiry desk and online.",
            waitingLounge: "Is there a waiting lounge?",
            loungeInfo: "Yes, we have a comfortable waiting area for passengers.",
            contactUs: "Contact Us",
            email: "Email: support@railwaystation.com",
            phone: "Phone: 139 ,182"
        },
        hi: {
            header: "रेलवे पोर्टल सहायक केंद्र",
            help: "सहायता डेस्क",
            faq: "अक्सर पूछे जाने वाले प्रश्न",
            contact: "संपर्क करें",
            assistance: "हमारा स्टाफ टिकट, ट्रेन अनुसूची और स्टेशन संबंधी सवालों में मदद के लिए 24/7 उपलब्ध है।",
            howToBook: "मैं टिकट कैसे बुक कर सकता हूँ?",
            bookOnline: "आप टिकट ऑनलाइन या स्टेशन काउंटर पर बुक कर सकते हैं।",
            findSchedule: "मैं ट्रेन का समय कहां देख सकता हूँ?",
            scheduleInfo: "ट्रेन का समय पूछताछ कक्ष और ऑनलाइन उपलब्ध है।",
            waitingLounge: "क्या एक प्रतीक्षालय है?",
            loungeInfo: "हां, हमारे पास यात्री के लिए आरामदायक प्रतीक्षालय है।",
            contactUs: "हमसे संपर्क करें",
            email: "ईमेल: support@railwaystation.com",
            phone: "फोन: 139 ,182"
        },
        te: {
            header: "రైల్వే పోర్టల్‌కు స్వాగతం",
            help: "సహాయం కేంద్రం",
            faq: "సాధారణంగా అడిగే ప్రశ్నలు",
            contact: "సంప్రదించండి",
            assistance: "మా సిబ్బంది 24/7 టిక్కెట్లు, ట్రెయిన్ షెడ్యూల్స్ మరియు స్టేషన్ ప్రశ్నలపై సహాయం అందిస్తుంది.",
            howToBook: "నేను టికెట్‌ను ఎలా బుక్ చేయగలవు?",
            bookOnline: "మీరు టికెట్లు ఆన్‌లైన్ లేదా స్టేషన్ కౌంటర్ వద్ద బుక్ చేయవచ్చు.",
            findSchedule: "నేను ట్రెయిన్ షెడ్యూల్స్‌ను ఎక్కడ చూడగలవు?",
            scheduleInfo: "ట్రెయిన్ షెడ్యూల్స్ పరిక్షా డెస్క్ మరియు ఆన్‌లైన్‌లో అందుబాటులో ఉన్నాయి.",
            waitingLounge: "మీకు ఒక వేచివున్న గది ఉందా?",
            loungeInfo: "అవును, మేము ప్రయాణికుల కోసం ఒక సౌకర్యవంతమైన వేచివున్న గది కలిగి ఉన్నాము.",
            contactUs: "మమ్మల్ని సంప్రదించండి",
            email: "ఇమెయిల్: support@railwaystation.com",
            phone: "ఫోన్: 139 ,182"
        },
        // Add more translations as needed...
    };

    const elements = {
        header: document.getElementById("header-text"),
        help: document.getElementById("help-text"),
        faq: document.getElementById("faq-text"),
        contact: document.getElementById("contact-text"),
        needAssistance: document.getElementById("need-assistance"),
        assistanceInfo: document.getElementById("assistance-info"),
        howToBook: document.getElementById("how-to-book"),
        bookInfo: document.getElementById("book-info"),
        findSchedule: document.getElementById("find-schedule"),
        scheduleInfo: document.getElementById("schedule-info"),
        waitingLounge: document.getElementById("waiting-lounge"),
        loungeInfo: document.getElementById("lounge-info"),
        contactUs: document.getElementById("contact-us"),
        emailText: document.getElementById("email-text"),
        phoneText: document.getElementById("phone-text")
    };

    // Retrieve the selected language from localStorage
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";

    // Apply the selected language to the page
    function updateLanguage(lang) {
        const t = translations[lang];
        if (!t) return;

        elements.header.textContent = t.header;
        elements.help.textContent = t.help;
        elements.faq.textContent = t.faq;
        elements.contact.textContent = t.contact;
        elements.needAssistance.textContent = t.assistance;
        elements.howToBook.textContent = t.howToBook;
        elements.bookInfo.textContent = t.bookOnline;
        elements.findSchedule.textContent = t.findSchedule;
        elements.scheduleInfo.textContent = t.scheduleInfo;
        elements.waitingLounge.textContent = t.waitingLounge;
        elements.loungeInfo.textContent = t.loungeInfo;
        elements.contactUs.textContent = t.contactUs;
        elements.emailText.textContent = t.email;
        elements.phoneText.textContent = t.phone;
    }

    updateLanguage(savedLanguage);
});
