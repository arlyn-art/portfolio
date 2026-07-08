window.tailwind = window.tailwind || {};

tailwind.config = {
    theme: {
        extend: {
            colors: {
                background: '#F7FAFC',
                surface: '#FFFFFF',
                border: '#E5E7EB',

                text: '#111827',
                subtext: '#6B7280',

                accent: '#2563EB',
                accent2: '#7C3AED',

                success: '#22C55E',
            },
            backgroundImage: {
                'product': "url('./assets/images/bg-product.jpg')",
            }
        }
    }
};