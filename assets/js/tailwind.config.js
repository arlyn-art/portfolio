window.tailwind = window.tailwind || {};

tailwind.config = {
    theme: {
        extend: {
            colors: {
                background: '#050505',
                surface: '#111111',
                Border: '#262626',
                Text: '#FFFFFF',
                SubText: '#A3A3A3',
                Accent: '#3B82F6',
                Accent2: '#8B5CF6',
            },
            backgroundImage: {
                'product': "url('./assets/images/bg-product.jpg')",
            }
        }
    }
};