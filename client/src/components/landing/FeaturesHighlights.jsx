import {TrendingUp,ShieldCheck,BarChart3} from "lucide-react";



function FeaturesHighlights(){

    const features = [
        {
            icon:<TrendingUp className="w-8 h-8 text-[#2563EB]"/>,
            title:"Smart Expense Tracking",
            discription:"Easily log and categorize expenses with insightful breakdowns."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#2563EB]" />,
            title: "Secure & Private",
            discription: "Your financial data is encrypted and always safe with us.",
        },
        {
            icon: <BarChart3 className="w-8 h-8 text-[#2563EB]" />,
            title: "Powerful Insights",
            discription: "Visual dashboards & AI-powered reports to help you stay ahead.",
          },
    ]
    return (
        <section className=" px-4 md:py-12 y-8 bg-[#F9FAFB]">
            <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3 text-center">
                { features.map((features,idx)=>(
                    <div className="md:p-6 p-3 bg-white rounded-2xl shadow-sm hover:shadow-lg transition" key={idx}>

                        <div className=" flex justify-center  md:mb-4 mb-2">{features.icon}</div>
                        <h3 className="text-lg font-semibold text-[#111827] md:mb-2 mb-1">
                            {features.title}
                        </h3>
                        <p className="text-sm text-[#6B7280]">{features.discription}</p>
                    </div>
                ))

                }

            </div>
        </section>
    )
}

export default FeaturesHighlights;