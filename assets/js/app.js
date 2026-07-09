import { loadComponent, loadPage } from './include.js';
import { setLanguage, initLanguage } from './language.js';
import { initSectionTabs } from './section-tabs.js';
import { initProjects } from "./projects.js";
import { initProjectModal } from "./project-modal.js";
import { initContact } from "./contact.js";

async function initPage(page) {

    await loadPage(page);

    if (page === 'home') {

        await loadComponent(
            'overview',
            './components/overview.html'
        );

        await loadComponent(
            'experience',
            './components/experience.html'
        );

        await loadComponent(
            'projects',
            './components/projects.html'
        );

        await loadComponent(
            'contact',
            './components/contact.html'
        );

        await loadComponent(
            'project-modal-container', 
            './components/partials/project-modal.html'
        );

        initProjects();
        initSectionTabs();
        initProjectModal();
        initContact();

    }

    setLanguage(
        localStorage.getItem('lang') || 'en'
    );

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

    // cukup sekali
    initLanguage();

    await initPage('home');

    document.addEventListener('click', async (e) => {

        const link = e.target.closest('[data-page]');

        if (!link) return;

        e.preventDefault();

        await initPage(link.dataset.page);

    });

});