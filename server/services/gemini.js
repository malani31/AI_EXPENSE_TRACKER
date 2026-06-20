import '../config/env.js';
import {GoogleGenerativeAI} from '@google/generative-ai';
import notificationSettingsModel from '../model/NotificationSettings.js';
import {createNotification} from './notificationService.js';

const genAI= new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askGemini(prompt,model="gemini-2.5-flash"){
    if(!genAI){
        throw new Error("gemini ai not properly initalized - check your api key");
    }

    try {
        const apiModel=genAI.getGenerativeModel({model});
        const result=await apiModel.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.log("Gemini API Error:",error);
        throw new Error("Gemini Api request failed");
    }
}

export async function extractTransactionFromRecipt(reciptBase64,mimeType){
    const model=genAI.getGenerativeModel({model:"gemini-2.5-flash"});

    const prompt=`
    you are an expense tracker assitsant.
    Extract structure data from the  receipt.
    Return only the valid Json Object in this exact format (no markdown,no code blocks,no extra text):
    {
        "type":"<income><expense>|null",
        "amount":"number",
        "date":"<yyyy-mm-dd>",
        "category":"<category>",
        "payment":"<cash|card|upi>",
        "note":"<short description>"
    }
    If the reciept for income(like salary,refund,transfer in),set type to "income".
    Otherwise ,set type to "expense".
    If any field missing.leave it null.
    Return only the Json object, notihng else. 
    `;

    const image={
        inlineData:{
            data:reciptBase64,
            mimeType
        },
    }

    const result=await model.generateContent([prompt,image]);
    let response=result.response.text().trim();

    response = response
    .replace(/^```json\s*/, "")
    .replace(/^```\s*/, "")
    .replace(/\s*```$/, "")
    .trim();
try {
    return JSON.stringify(response);
} catch (error) {
    console.error("gemini json parser error:",error);
    return null;
}

}

export async  function autoCategoriesTransaction(note){
    const prompt=`
    Based on note: ${note} ,suggest most relevant category
    from:[groceries,food,shopping,travel,entertainment,bills,utilities,rent,other].
    Return only the category string
    `
    return askGemini(prompt);
} 

export async function budgetInsights(userId,transaction,budget){
    try {
        const settings=await notificationSettingsModel.findOne({userId});
        if(!settings || !settings.budgetAlerts){
            return {
                totalsByCategory: {},
                warnings: {},
                tips: [],
            }
        }

        const prompt=`
        You are analyzing personal finance data.
        Given these transactions: ${JSON.stringify(transaction)},
        and monthly budget: ${JSON.stringify(budget)},
    
        Respond with ONLY a raw JSON object. 
        Do NOT include markdown, code fences, or any explanation. 
        Output must be directly parsable with JSON.parse().
    
        {
          "totalsByCategory": { "category1": number, "category2": number, ... },
          "warnings": [ "warning1", "warning2", ... ],
          "tips": [ "tip1", "tip2", ... ],
        }
    
        Rules:
        - "totalsByCategory" should be numeric totals for each category.
        - "warnings" should contain any budget alerts (e.g., overspending, nearing limit).
        - "tips" should be practical saving tips.
        - If nothing to report, return empty arrays/objects.
      `;

      const response= await askGemini(prompt);

      const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

      let parsed=JSON.parse(cleaned);

      if(!parsed.totalsByCategory) parsed.totalsByCategory = {};
      if(!parsed.warnings) parsed.warnings = [];
      if(!parsed.tips) parsed.tips = [];

      if(budget?.monthlyBudget){
        const totalExpense = transaction
        .filter(t => t.type === "expense")
        .reduce((a, t) => a + t.amount, 0);

      if(totalExpense >= 0.8 * budget.monthlyBudget) {
        const msg = `You've already used ${(totalExpense / budget.monthlyBudget * 100).toFixed(1)}% of your monthly budget.`;
        parsed.warnings.push(msg);
        await createNotification(userId, msg, "budget");
      }
    }

    if(budget?.categoryBudgets?.length){
        const totalsByCategory=transaction
        .filter(t=>t.type==='expense')
        .reduce((acc,t)=>{
            acc[t.category]=(acc[t.category] || 0) +t.amount;
            return acc;
        },{});
        
        for(let catBudget of budget.categoryBudgets){
            const spent=totalsByCategory[catBudget.category] ||0;
            if(spent >= 0.8 * catBudget.amount ){
                const msg=`you've spent ${(spent / catBudget.amount *100).toFixed(1)}% of your ${catBudget.category} budget.}`;
                parsed.warnings.push(msg);
                await createNotification(userId,msg,"budget");
            }
        }

        parsed.totalsByCategory={...parsed.totalsByCategory,...totalsByCategory}
    }

    for (let aiWarn of parsed.warnings){
        if(aiWarn && aiWarn.trim()){
            await createNotification(userId,msg,"budget",true);
        }
    }
    return parsed;

    } catch (error) {
        console.log("budgetInsights Error:",error);
        return{
            totalsByCategory: {},
      warnings: [],
      tips: [],
        }
    }
}
export default genAI;