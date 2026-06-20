import React,{useEffect,useState} from "react";
import {PieChart,Pie,Cell,Tooltip,ResponsiveContainer} from 'recharts';
import {motion,AnimatePresence} from 'framer-motion';
import {fetchCategoryBreakdown}from '../../api/charts.js';


const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#F97316", "#EC4899"];

export default function CategoryBreakdownCharts({userId,month,year}){

    const [data,setData]=useState([]);
    const [selected,setSelected] = useState(null);
    const [isloading,setIsLoading] = useState(null);

    useEffect(()=>{
        if(!userId) return ;

        setIsLoading(true);

        (async ()=>{
            try {
                const res =  await fetchCategoryBreakdown(userId,month,year);
                const breakdown= res.breakdown || {};
                const pieData = Object.keys(breakdown).map((cat)=>({
                    name:cat,
                    value:breakdown[cat].amount,
                    percent:breakdown[cat].percent,
                }));
                setData(pieData);

            } catch (error) {
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        })

    },[userId,month,year]);
}