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

async function askAI(messages) {
    let response = null
    console.log("Asked AI " + messages[1].content)
    const data = {
        model: 'openchat/openchat-3.5-1210',
        max_tokens: 5095,
        messages: messages
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

export const NormalizeTextPrompt  = `Твоя цель преобразовать текст, полученный из OCR, в обычный, читаемый текст, исправляя ошибки распознавания, форматирования и пунктуации, в ответ напиши только текст, который исправлен и отформатирован в соответствии с правилами языка.`

// export const NormalizeTextPrompt  = `
// Цель: преобразовать текст, полученный из OCR, в обычный, читаемый текст, исправляя ошибки распознавания, форматирования и пунктуации.
// Вход: текст, полученный из OCR, который может содержать ошибки, пропуски, лишние символы и неправильное форматирование.
// Выход: текст, который исправлен и отформатирован в соответствии с правилами русского языка и стиля.

// ## Алгоритм:
// - Для каждого входного текста выполнить следующие шаги:
//   - Коррекция текста для исправления ошибок, пропусков и лишних символов в тексте, используя словарь, грамматику и контекст.
//   - Форматирование текста для добавления или удаления пробелов, переносов строк, заглавных букв, знаков препинания и других элементов, используя правила русского языка и стиля.
//   - Вернуть преобразованный текст как выход.
// `

export const TranslateTextPrompt = `Твоя цель перевести текст на другой язык, полностью сохраняя смысл, язык указан после текста, в ответ напиши только переведённый текст.`

// export const TranslateTextPrompt = `
// Твоя цель перевести текст на другой язык, полностью сохраняя смысл и эмоциональный фон. На вход ты получаешь текст на исходном языке и код целевого языка (например, en для английского, ru для русского и т.д.) в двойных фигурных скобках. Твоим ответом должен быть текст на целевом языке, максимально соответствующий исходному по смыслу и эмоциональному фону.
// `

export const RefactorTextPrompt = `Твоя цель рефакторить текст в указанном стиле и тоне, стиль и тон указаны отдельно после текста, в ответ напиши только рефакторированный текст в желаемом стиле и тоне.`

// export const RefactorTextPrompt = `
// - Цель: Рефакторить текст в указанном стиле или тоне.
// - Вход: Исходный текст и желаемый стиль и тон.
// - Выход: Рефакторированный текст в желаемом стиле или тоне.
// `

export const GenerateTextPrompt = `Твоя цель написать короткий текст на русском языке по данной тебе теме, текст должен быть не более 200 слов, быть понятным и интересным для читателя, в ответ напиши только сам готовый текст.`

// export const GenerateTextPrompt = `
// - Вход: Тема текста
// - Цель: Написать короткий текст, в котором выражается свое отношение к теме или приводятся примеры из личного опыта если текст того требует.
// - Ограничения: Текст должен быть не более 200 слов, быть понятным и интересным для читателя, не содержать оскорблений или непристойностей
// `

export const SummariseTextPrompt = `Твоя цель создать краткое и содержательное резюме из длинного или сложного текста, в ответ напиши только резюме текста, состоящее из нескольких предложений, пунктов, которые отражают основную идею, ключевые факты и выводы текста.`

// export const SummariseTextPrompt = `
// - Цель: создать краткое и содержательное резюме из длинного и сложного текста
// - Вход: длинный или сложный текст на любую тему
// - Выход: резюме текста, состоящее из нескольких предложений, пунктов, которые отражают основную идею, ключевые факты и выводы текста
// `

export default askAI