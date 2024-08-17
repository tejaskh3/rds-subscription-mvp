document.getElementById('emailForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/add-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            alert('Email submitted successfully!');
        } else {
            alert('Failed to submit email.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
    }
});
