import { loadComponent, loadPage } from './include.js';
import { setLanguage, initLanguage } from './language.js';
import { initSectionTabs } from './section-tabs.js';
import { initProjects } from "./projects.js";
import { initProjectModal } from "./project-modal.js";
import { initContact } from "./contact.js";
import { initProfile } from "./profile.js";
import { initJourney } from "./journey.js";
import { initJourneyModal } from "./journey-modal.js";

function updateActiveNav(page) {
    const navLinks = document.querySelectorAll('[data-page]');

    navLinks.forEach(link => {
        if (link.dataset.page === page) {
            link.classList.remove('text-subtext', 'hover:text-accent');
            link.classList.add('text-accent');
        } else {
            link.classList.remove('text-accent');
            link.classList.add('text-subtext', 'hover:text-accent');
        }
    });
}

async function initPage(page) {
    await loadPage(page);

    if (page === 'home') {
        await loadComponent('overview', './components/overview.html');
        await loadComponent('experience', './components/experience.html');
        await loadComponent('projects', './components/projects.html');
        await loadComponent('contact', './components/contact.html');
        await loadComponent('project-modal-container', './components/partials/project-modal.html');
        await loadComponent('floating', './components/floating.html');

        initProjects({ limit: 3 });
        initProjectModal();
        initProfile();
        initContact();
        initSectionTabs();
    }

    if (page === 'profile') {
        initProfile();
    }

    if (page === "journey") {
        await loadComponent('journey-modal-container', './components/partials/journey-modal.html');
        initJourney();
        initJourneyModal();
    }

    if (page === 'projects') {
        await loadComponent('projects', './components/projects.html');
        await loadComponent('project-modal-container', './components/partials/project-modal.html');
        initProjects(); 
        initProjectModal();
    }

    setLanguage(localStorage.getItem('lang') || 'en');
    updateActiveNav(page);
}

document.addEventListener('DOMContentLoaded', async () => {

    await loadComponent(
        'navbar',
        './components/partials/navbar.html'
    );

    await loadComponent(
        'footer',
        './components/partials/footer.html'
    );

    initLanguage();

    await initPage('home');

    document.addEventListener('click', async (e) => {

        const link = e.target.closest('[data-page]');

        if (!link) return;

        e.preventDefault();

        await initPage(link.dataset.page);

    });

});