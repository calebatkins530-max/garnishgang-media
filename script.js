document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lead-form');
  const status = document.getElementById('form-status');
  
  // Replace with your active Make webhook URL
  const MAKE_WEBHOOK_URL = 'https://hook.us1.make.com/YOUR_WEBHOOK_ID';

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;

      status.textContent = 'Processing...';
      status.style.color = 'var(--text-muted)';

      try {
        const res = await fetch(MAKE_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            source: 'garnishgang_landing_lead',
            timestamp: new Date().toISOString()
          })
        });

        if (res.ok) {
          status.textContent = 'Success! Your blueprint is on the way.';
          status.style.color = 'var(--primary)';
          form.reset();
        } else {
          throw new Error('Network response failed');
        }
      } catch (err) {
        status.textContent = 'System offline. Please try again shortly.';
        status.style.color = '#ff5c5c';
      }
    });
  }
});
