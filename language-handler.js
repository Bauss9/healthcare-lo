// Language Handler - Auto-detect and redirect based on browser language
(function() {
    // Get current path
    const currentPath = window.location.pathname;
    const isRoot = currentPath === '/' || currentPath === '/index.html';

    // Only redirect if on root
    if (isRoot) {
        // Check if user has previously selected a language
        const savedLang = localStorage.getItem('selectedLanguage');

        if (savedLang) {
            window.location.href = `/${savedLang}/`;
            return;
        }

        // Detect browser language
        const userLang = navigator.language || navigator.userLanguage;
        const langCode = userLang.toLowerCase();

        // Language mapping
        let targetLang = 'en'; // default

        if (langCode.startsWith('pt')) {
            targetLang = 'pt-br';
        } else if (langCode.startsWith('sq') || langCode.startsWith('al')) {
            targetLang = 'sq';
        } else if (langCode.startsWith('de')) {
            targetLang = 'de';
        }

        // Redirect to detected language
        window.location.href = `/${targetLang}/`;
    }
})();

// Language Switcher Functions
function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    window.location.href = `/${lang}/`;
}

function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('/pt-br/')) return 'pt-br';
    if (path.includes('/sq/')) return 'sq';
    if (path.includes('/de/')) return 'de';
    return 'en';
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getCurrentLanguage();
    const switcher = document.getElementById('languageSwitcher');

    if (switcher) {
        const button = switcher.querySelector('.lang-button');
        const menu = switcher.querySelector('.lang-menu');

        // Set current language flag
        const flags = {
            'en': '🇬🇧',
            'pt-br': '🇧🇷',
            'sq': '🇦🇱',
            'de': '🇩🇪'
        };

        if (button) {
            button.querySelector('.current-lang').textContent = flags[currentLang];
        }

        // Toggle menu
        if (button && menu) {
            button.addEventListener('click', function() {
                menu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!switcher.contains(e.target)) {
                    menu.classList.remove('active');
                }
            });
        }
    }
});
