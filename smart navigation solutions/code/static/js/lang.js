document.addEventListener("DOMContentLoaded", function () {
    const translations = {
        en: {
            home: "Home",
            ticket: "Ticket Booking",
            help: "Help",
            language: "Language",
            logout: "Logout",
            welcome: "Welcome to Railway Portal",
            train: "Train",
            ticket_booking: "Ticket Booking",
            live_tracking: "Live Tracking",
            food_court: "Food Court",
            hotel: "Hotel Room",
            restroom: "Rest Room",
            help_call: "Help Call"
        },
        hi: {
            home: "होम",
            ticket: "टिकट बुकिंग",
            help: "सहायता",
            language: "भाषा",
            logout: "लॉग आउट",
            welcome: "रेलवे पोर्टल में आपका स्वागत है",
            train: "ट्रेन",
            ticket_booking: "बुकिंग",
            live_tracking: "लाइव ट्रैकिंग",
            food_court: "भोजनालय",
            hotel: "होटल कमरा",
            restroom: "विश्राम कक्ष",
            help_call: "सहायता कॉल"
        },
        te: {
            home: "హోమ్",
            ticket: "టికెట్ బుకింగ్",
            help: "సహాయం",
            language: "భాష",
            logout: "లాగ్ అవుట్",
            welcome: "రైల్వే పోర్టల్‌కు స్వాగతం",
            train: "ట్రైన్",
            ticket_booking: "టికెట్ బుకింగ్",
            live_tracking: "లైవ్ ట్రాకింగ్",
            food_court: "ఫుడ్ కోర్ట్",
            hotel: "హోటల్ గది",
            restroom: "విశ్రాంతి గది",
            help_call: "సహాయ కాల్"
        },
        kn: {
            home: "ಮನೆ",
            ticket: "ಟಿಕೆಟ್ ಬುಕ್ಕಿಂಗ್",
            help: "ಸಹಾಯ",
            language: "ಭಾಷೆ",
            logout: "ಲಾಗ್ ಔಟ್",
            welcome: "ರೈಲ್ವೆ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ",
            train: "ರೈಲು",
            ticket_booking: "ಟಿಕೆಟ್ ಬುಕ್ಕಿಂಗ್",
            live_tracking: "ಲೈವ್ ಟ್ರಾಕಿಂಗ್",
            food_court: "ಅನ್ನಭವನ",
            hotel: "ಹೋಟೆಲ್ ಕೊಠಡಿ",
            restroom: "ವಿಶ್ರಾಂತಿ ಕೊಠಡಿ",
            help_call: "ಸಹಾಯ ಕರೆ"
        },
        ml: {
            home: "ഹോം",
            ticket: "ടിക്കറ്റ് ബുക്കിംഗ്",
            help: "സഹായം",
            language: "ഭാഷ",
            logout: "ലോഗൗട്ട്",
            welcome: "റെയിൽവേ പോർട്ടലിലേക്ക് സ്വാഗതം",
            train: "ട്രെയിൻ",
            ticket_booking: "ടിക്കറ്റ് ബുക്കിംഗ്",
            live_tracking: "ലൈവ് ട്രാക്കിംഗ്",
            food_court: "ഫുഡ് കോർട്ട്",
            hotel: "ഹോട്ടൽ റൂം",
            restroom: "റെസ്റ്റ്റൂം",
            help_call: "സഹായ വിളി"
        },
        ta: {
            home: "முகப்பு",
            ticket: "டிக்கெட் பதிவு",
            help: "உதவி",
            language: "மொழி",
            logout: "வெளியேறு",
            welcome: "ரயில்வே போர்ட்டலுக்கு வரவேற்கிறோம்",
            train: "ரயில்",
            ticket_booking: "டிக்கெட் பதிவு",
            live_tracking: "நேரடி கண்காணிப்பு",
            food_court: "உணவகம்",
            hotel: "ஹோட்டல் அறை",
            restroom: "விசிறி அறை",
            help_call: "உதவி அழைப்பு"
        },
        ur: {
            home: "ہوم",
            ticket: "ٹکٹ بکنگ",
            help: "مدد",
            language: "زبان",
            logout: "لاگ آوٹ",
            welcome: "ریلوی پورٹل میں خوش آمدید",
            train: "ٹرین",
            ticket_booking: "ٹکٹ بکنگ",
            live_tracking: "لائیو ٹریکنگ",
            food_court: "فوڈ کورٹ",
            hotel: "ہوٹل روم",
            restroom: "ریسٹ روم",
            help_call: "مدد کال"
        }
    };

    const elements = {
        home: document.getElementById("home-link"),
        ticket: document.getElementById("ticket-link"),
        help: document.getElementById("help-link"),
        language: document.getElementById("language-text"),
        logout: document.querySelector(".logout a"),
        welcome: document.getElementById("welcome-text"),
        train: document.querySelector(".train a"),
        ticketText: document.getElementById("ticket-text"),
        liveTracking: document.querySelector(".live-tracking a"),
        foodCourt: document.querySelector(".food-court a"),
        hotel: document.querySelector(".hotel a"),
        restroom: document.querySelector(".restroom a"),
        helpCall: document.querySelector(".help a")
    };

    const languageMenu = document.getElementById("language-menu");
    const languageToggle = document.querySelector(".language-dropdown");

    function updateLanguage(lang) {
        const t = translations[lang];
        if (!t) return;

        elements.home.innerHTML = `<i class="fas fa-home"></i> ${t.home}`;
        elements.ticket.innerHTML = `<i class="fas fa-ticket-alt"></i> ${t.ticket}`;
        elements.help.innerHTML = `<i class="fas fa-phone"></i> ${t.help}`;
        elements.language.innerHTML = `<i class="fas fa-globe"></i> ${t.language}`;
        elements.logout.innerHTML = `<i class="fas fa-sign-out-alt"></i> ${t.logout}`;
        elements.welcome.textContent = t.welcome;
        elements.train.innerHTML = `<i class="fas fa-train"></i> ${t.train}`;
        elements.ticketText.innerHTML = `<i class="fas fa-ticket-alt"></i> ${t.ticket_booking}`;
        elements.liveTracking.innerHTML = `<i class="fas fa-map-marked-alt"></i> ${t.live_tracking}`;
        elements.foodCourt.innerHTML = `<i class="fas fa-utensils"></i> ${t.food_court}`;
        elements.hotel.innerHTML = `<i class="fas fa-hotel"></i> ${t.hotel}`;
        elements.restroom.innerHTML = `<i class="fas fa-restroom"></i> ${t.restroom}`;
        elements.helpCall.innerHTML = `<i class="fas fa-phone"></i> ${t.help_call}`;

        localStorage.setItem("selectedLanguage", lang);
    }

    languageMenu.addEventListener("click", function (e) {
        if (e.target.tagName === "A" && e.target.dataset.lang) {
            e.preventDefault();
            const selectedLang = e.target.dataset.lang;
            updateLanguage(selectedLang);
        }
    });

    if (languageToggle && languageMenu) {
        languageToggle.addEventListener("click", function (e) {
            e.preventDefault();
            languageMenu.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!languageToggle.contains(event.target) && !languageMenu.contains(event.target)) {
                languageMenu.classList.remove("show");
            }
        });
    }

    // Load saved language on startup
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    updateLanguage(savedLanguage);
});
