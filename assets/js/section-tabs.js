export function initSectionTabs() {
    const buttons = document.querySelectorAll('.section-tab');
    if (!buttons.length) return;

    const sections = document.querySelectorAll('.portfolio-section');
    const dividers = document.querySelectorAll('.section-divider');
    const viewAllWrapper = document.getElementById('view-all-wrapper');

    const scrollContainer = document.querySelector('.tabs-scroll');

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

        if (viewAllWrapper) {
            if (id === 'projects') {
                applyFadeUpAnimation(viewAllWrapper);
            } else {
                viewAllWrapper.classList.add('hidden');
                viewAllWrapper.classList.remove('opacity-100', 'translate-y-0');
            }
        }

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    if (scrollContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.classList.add('active');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.classList.remove('active');
        });

        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.classList.remove('active');
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault(); 
            
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 1.5; 
            scrollContainer.scrollLeft = scrollLeft - walk;
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