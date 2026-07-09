export function initContact() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btn = document.getElementById("form-btn");
        const btnText = document.getElementById("btn-text");
        const btnSpinner = document.getElementById("btn-spinner");
        const statusBox = document.getElementById("form-status");
        const lang = localStorage.getItem('lang') || 'en';

        btn.disabled = true;
        btn.classList.add("opacity-70", "cursor-not-allowed");
        btnSpinner.classList.remove("hidden");
        btnText.textContent = lang === 'id' ? "Mengirim..." : "Sending...";

        statusBox.className = "hidden text-sm font-medium p-4 rounded-xl text-center";

        const formData = new FormData(form);
        
        formData.append("access_key", "aacf4e79-ecfd-4e1e-80f1-c48fa3a95ec9");

        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success === true) {
                statusBox.classList.remove("hidden");
                statusBox.classList.add("bg-success/10", "text-success", "border", "border-success/20");
                statusBox.textContent = lang === 'id' 
                    ? "Pesan berhasil dikirim! Terima kasih." 
                    : "Message sent successfully! Thank you.";
                
                form.reset(); 
            } else {
                throw new Error(result.message || "Gagal mengirim via Web3Forms API");
            }

        } catch (error) {
            console.error("Detail Error Pengiriman:", error);

            statusBox.classList.remove("hidden");
            statusBox.classList.add("bg-error/10", "text-error", "border", "border-error/20");
            statusBox.textContent = lang === 'id' 
                ? "Ups, terjadi kesalahan. Silakan coba lagi." 
                : "Oops, something went wrong. Please try again.";
        } finally {
            btn.disabled = false;
            btn.classList.remove("opacity-70", "cursor-not-allowed");
            btnSpinner.classList.add("hidden");
            btnText.textContent = lang === 'id' ? "Kirim Pesan" : "Send Message";
        }
    });
}