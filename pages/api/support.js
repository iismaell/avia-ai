
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const answer =await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.question,
        temperature: 0.27,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    res.status(200).json({ result: answer.data.choices[0].text });
}


