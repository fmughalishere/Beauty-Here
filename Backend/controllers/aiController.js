import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSkincareRoutine = async (req, res) => {
    const { skinType, skinConcerns, preferredProducts } = req.body;

    const ourProducts = `
        - Gentle Cleansing Facewash (for all skin types)
        - Vitamin C Brightening Serum (for dullness and dark spots)
        - Hydrating Face Cream (for dry skin)
        - Oil-Control Moisturizer (for oily skin)
        - Soothing Aloe Vera Gel (for sensitive skin)
        - Exfoliating Scrub (use twice a week)
        - Nourishing Night Cream (for anti-aging and repair)
        - Sunscreen SPF 50 (essential for all)
    `;

    const prompt = `
        You are an expert dermatologist for an e-commerce brand called "BeautyHere".
        A customer has provided the following information:
        - Skin Type: ${skinType}
        - Main Concerns: ${skinConcerns}
        - Products they like: ${preferredProducts}

        Based on this, create a simple, personalized morning and evening skincare routine for them.
        You MUST recommend products ONLY from the following list of our available products:
        ${ourProducts}

        Format your response clearly with "Morning Routine" and "Evening Routine" headings. Keep it friendly and encouraging. Explain briefly why each recommended product is good for them.
    `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();        
        res.json({ success: true, routine: text });
    } catch (error) {
        console.error("Google Gemini API Error:", error);
        res.status(500).json({ success: false, message: "Failed to generate routine. Please try again." });
    }
};

export { generateSkincareRoutine };
