export async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        const html = await response.text();

        document.getElementById(id).innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

export async function loadPage(page) {
    try {
        const response = await fetch(`./pages/${page}.html`);
        const html = await response.text();

        const app = document.getElementById('app');
        app.innerHTML = html;

        if (window.Alpine) {
            Alpine.initTree(app);
        }

    } catch (error) {
        console.error(error);
    }
}