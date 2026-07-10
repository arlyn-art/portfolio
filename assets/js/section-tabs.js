export function initSectionTabs() {
    const buttons = document.querySelectorAll('.section-tab');
    if (!buttons.length) return;

    const sections = document.querySelectorAll('.portfolio-section');
    const dividers = document.querySelectorAll('.section-divider');
    // Ambil element wrapper tombol view all
    const viewAllWrapper = document.getElementById('view-all-wrapper');

    function applyFadeUpAnimation(element) {
        element.classList.remove('hidden', 'opacity-0', 'translate-y-4');
        element.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-1000', 'ease-out');
        
        void element.offsetWidth;
        
        element.classList.remove('opacity-0', 'translate-y-4');
        element.classList.add('opacity-100', 'translate-y-0');
    }

    function showAll() {
        sections.forEach(section => {
            applyFadeUpAnimation(section);
        });

        dividers.forEach(divider => {
            divider.classList.remove('hidden');
            applyFadeUpAnimation(divider);
        });

        // Di tab 'All', pastikan tombol View All muncul
        if (viewAllWrapper) {
            applyFadeUpAnimation(viewAllWrapper);
        }
    }

    function showSection(id) {
        sections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('opacity-100', 'translate-y-0');
        });

        dividers.forEach(divider => {
            divider.classList.add('hidden');
            divider.classList.remove('opacity-100', 'translate-y-0');
        });

        const target = document.getElementById(id);
        if (!target) return;

        applyFadeUpAnimation(target);

        // --- LOGIKA TOGGLE BUTTON VIEW ALL ---
        if (viewAllWrapper) {
            if (id === 'projects') {
                // Jika masuk ke tab projects, munculkan tombol
                applyFadeUpAnimation(viewAllWrapper);
            } else {
                // Jika masuk ke tab lain (overview, contact, dll), sembunyikan
                viewAllWrapper.classList.add('hidden');
                viewAllWrapper.classList.remove('opacity-100', 'translate-y-0');
            }
        }
        // -------------------------------------

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => {
                btn.classList.remove('bg-accent', 'text-white');
                btn.classList.add('text-subtext');
            });

            button.classList.add('bg-accent', 'text-white');
            button.classList.remove('text-subtext');

            const section = button.dataset.section;

            if (section === 'all') {
                showAll();
            } else {
                showSection(section);
            }
        });
    });

    showAll();
}