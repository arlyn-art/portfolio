import { loadComponent, loadPage } from './include.js';

document.addEventListener('DOMContentLoaded', async () => {

    await loadComponent(
        'navbar',
        './components/partials/navbar.html'
    );

    await loadComponent(
        'footer',
        './components/partials/footer.html'
    );

    loadPage('home');

    document.addEventListener('click', (e) => {

        const link = e.target.closest('[data-page]');

        if (!link) return;

        e.preventDefault();

        loadPage(link.dataset.page);

    });

});