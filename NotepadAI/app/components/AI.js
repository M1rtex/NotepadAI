const url = 'https://api.together.xyz/v1/chat/completions';
const apiKey = 'ced5adc36ab877527b6e709897c3e0dcc4727167979388071f4d3b5578760947';
const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
});

let mges = [
    {
        role: 'system',
        content: 'Ты нейросеть, направленная  на редактирование текста. Формируй ответы на Русском языке. В ответе не добавляй пояснения и ответы пользователю от себя, отдавай только результат.'
    },
    {
        role: 'user',
        content: 'Who won the world series in 2020?'
    }
    ]

async function askAI(message) {
    let response = null
    console.log("Asked AI " + message.content)
    const data = {
        model: 'openchat/openchat-3.5-1210',
        max_tokens: 2048,
        messages: [
            {
                role: 'system',
                content: 'Ты нейросеть, направленная  на редактирование текста. Формируй ответы на Русском языке. В ответе не добавляй пояснения и ответы пользователю от себя, отдавай только результат.'
            },
            message
        ]
    };

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    };

    await fetch(url, options)
        .then(response => response.json())
        .then(result => {
        response = {"Result": result}
        })
        .catch(error => {
        console.error('Error:', error);
        });
    return response
}


export default askAI