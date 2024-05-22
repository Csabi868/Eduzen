async function sendPrompt() {
    const prompt = document.getElementById('prompt').value;
    const responseDiv = document.getElementById('response');

    try {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); // Log the response data for debugging

        if (data && data.choices && data.choices.length > 0) {
            responseDiv.innerText = data.choices[0].message.content;
        } else {
            responseDiv.innerText = 'Error: Unexpected response structure';
        }
    } catch (error) {
        console.error('Error fetching response:', error);
        responseDiv.innerText = 'Error: ' + error.message;
    }
}
