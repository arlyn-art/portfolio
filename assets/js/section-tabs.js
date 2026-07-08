export function initSectionTabs() {

    const buttons = document.querySelectorAll('.section-tab');

    if (!buttons.length) return;

    const sections = document.querySelectorAll('.portfolio-section');
    const dividers = document.querySelectorAll('.section-divider');

    function showAll() {

        sections.forEach(section => {
            section.classList.remove('hidden');
        });

        dividers.forEach(divider => {
            divider.classList.remove('opacity-0');
            divider.classList.add('opacity-100');
        });

    }

    function showSection(id) {

        sections.forEach(section => {
            section.classList.add('hidden');
        });

        dividers.forEach(divider => {
            divider.classList.remove('opacity-100');
            divider.classList.add('opacity-0');
        });

        const target = document.getElementById(id);

        if (!target) return;

        target.classList.remove('hidden');

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    }

    buttons.forEach(button => {

        button.addEventListener('click', () => {

            buttons.forEach(btn => {
                btn.classList.remove(
                    'bg-accent',
                    'text-white'
                );

                btn.classList.add(
                    'text-subtext'
                );
            });

            button.classList.add(
                'bg-accent',
                'text-white'
            );

            button.classList.remove(
                'text-subtext'
            );

            const section = button.dataset.section;

            if (section === 'all') {
                showAll();
            } else {
                showSection(section);
            }

        });

    });

    // Default ketika halaman pertama dibuka
    showAll();

}