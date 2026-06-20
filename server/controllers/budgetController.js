import budgetModel from "../model/Budget.js";

function calculateBudgetInsights(budget){
    const overallPercentage=(budget.spent / budget.limit) * 100;
    let overallAlert="within budget";

    if(overallPercentage >=100) overallAlert="Budget exceeded";
    else if(overallPercentage >=80) overallAlert="Warning: 80% budget used";

    const savingsPercent= budget.targetSavings ?((budget.spent/ budget.targetSavings) *100).toFixed(2) : 0;

    const categoryAlerts= budget.categoryBudgets.map(cat =>{
        const percentage=(cat.spent/cat.limit) *100 ;
        let alert='within budget';
    })

    if(percentage >=100) alert="budget exceeded!";
    else if (percentage >=80) alert="warning: 80% budget used";

    return {
        category:cat.category,
        categorySpent:cat.spent,
        categoryLimit:cat.categoryAlerts,
        percentage:Number(percentage.toFixed(2)) + "%",
        alert
    }

    return {
        overall:{
            spent:budget.spent,
            limit:budget.limit,
            remaining:budget.limit-budget.spent,
            percentage:Math.round(overallPercentage) + "%",
            alert:overallAlert,
        },
        savingsTargetPercentage:savingsPercent+"%",
        categoryAlerts
    }

}

export const setBudget=async (req,res)=>{
    try {
        const {userId,limit ,spent,month,year,categoryBudgets,targetSavings}=req.body;

        const existingBudget= await budgetModel.findOne({
            userId,
            month:Number(month),
            year:Number(year),
        });

        if(existingBudget) {
            return res.status(400).json({message:"Budget is already exists for this month"})
        }

        const budget=await budgetModel.create({
            userId,
            month:Number(month),
            year:Number(year),
            limit,
            spent:0,
            targetSavings:targetSavings || 0,
            categoryBudgets: categoryBudgets?.map(cat => ({...cat,spent:0})) || [],
        });

        res.status(201).json({message:"Budget Set Successfully"},budget);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Something went Wrong"});
    }
};

export const getBudget = async(req,res)=>{
    try {
        const {userId,month,year}=req.body;

        const budget=await budgetModel.findOne({
            userId,
            month:Number(month),
            year:Number(year)
        });
        if(!budget){
            return res.status(400).json({message:"No Budget Found"});
        }
        const insights=calculateBudgetInsights(budget);

        res.status(200).json({
            ...budget._doc,
            insights
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error during get Budget"})
    }
}

export const updateBudget = async (req,res)=>{
    try {
        const {limit,targetSavings,categoryBudgets}=req.body;
        const {id}=req.params;

        const updateFields={};
        if(limit) updateFields.limit=limit;
        if(categoryBudgets) updateFields.categoryBudgets=categoryBudgets;
        if(targetSavings !== undefined) updateFields.targetSavings=targetSavings; 

        const budget= await budgetModel.findByIdAndUpdate(id,updateFields,{new:true});

        if(!budget){
            return res.status(400).json({message:"No Budget found"});
        }
        const insights=calculateBudgetInsights(budget);

        res.status(200).json({message:"Budget Update Successfully",budget,insights});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error during updateBudget"});
    }
}

export const deleteBudget = async (req,res)=>{
    try {
        const {id}=req.params;
        const budget=await budgetModel.findByIdAndDelete(id);
        if(!budget){
            return res.status(404).json({ message: "No budget found" });
        }
        res.status(200).json({message:"Budget Updated Successfully",budget});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error during deleteBudget"});
    }
}