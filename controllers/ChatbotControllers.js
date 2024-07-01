const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyB_FywwVjtjdtOPM5urD9_9GQxrA6HjUrA');

// Chatbot message handler
const ChatBot = async (req, res, next) => {
    const { prompt } = req.body;
    try {
        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate content based on the prompt
        const result = await model.generateContent(prompt);
        const response = await result.response;

        // Extract only the content from the response
        const content = response.candidates[0].content.parts[0].text;

        // Return the content in the response
        res.status(200).json({ data: content });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ status: "error", data: error.message });
    }
}

module.exports = { ChatBot };
