import id from './language/id.js';
import en from './language/en.js';

const languages = {
    id,
    en
};

export function setLanguage(lang = 'en') {

    const data = languages[lang];

    document.querySelectorAll('[data-i18n]').forEach(element => {

        const path = element.dataset.i18n;

        const value = path.split('.').reduce((obj, key) => obj?.[key], data);

        if (value !== undefined) {
            element.textContent = value;
        }

    });

    localStorage.setItem('lang', lang);

    updateLanguageToggle(lang);
}

function updateLanguageToggle(lang) {

    const slider = document.getElementById('language-slider');

    const buttons = document.querySelectorAll('[data-lang]');

    if (!slider) return;

    if (lang === 'en') {
        slider.style.transform = 'translateX(0)';
    } else {
        slider.style.transform = 'translateX(44px)';
    }

    buttons.forEach(button => {

        if (button.dataset.lang === lang) {
            button.classList.remove('text-subtext');
            button.classList.add('text-white');
        } else {
            button.classList.remove('text-white');
            button.classList.add('text-subtext');
        }

    });

}

export function initLanguage() {

    document.addEventListener('click', (e) => {

        const button = e.target.closest('[data-lang]');

        if (!button) return;

        setLanguage(button.dataset.lang);

    });

}