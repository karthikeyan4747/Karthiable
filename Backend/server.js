const express = require("express");
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API })

const app = express();

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.json({ "Message": "Alu" })
})



app.post("/generate", async (req, res) => {
    const prompt = req.body.prompt;

    const response = await groq.chat.completions.create({
        max_completion_tokens: 4000,
        model: 'openai/gpt-oss-120b',
        messages: [{
            role: 'system', content: `You are a web app generator. 
                    Return ONLY a single complete HTML file with all CSS and JS embedded inside it.
                    No explanations. No markdown. No backticks. No preamble.
                    Just raw HTML starting with <!DOCTYPE html>.`}, { role: "user", content: prompt }]
    })


    const code = response.choices[0].message.content;

    res.send(code)

})


app.listen(PORT, () => {
    console.log("http://localhost:3000/")
})