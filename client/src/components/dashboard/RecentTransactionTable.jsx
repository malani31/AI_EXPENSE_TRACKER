import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTransactions } from "../../redux/slices/transactionSlice";
import { useEffect } from "react";

const RecentTransactionTable= ()=>{
    const {transactions,loading,error}=useSelector(
        (state)=>state.transactions
    )
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(()=>{
        dispatch(fetchTransactions());
    },[dispatch]);

    const recentTranscations = [...transactions]
        .sort((a,b)=> new Date(b.date)- new Date(a.date))
        .slice(0,5);

    return (
        <div className="my-4">
            <h2 className="md:text-lg text-md font-semibold mb-4">Recent Transactions</h2>

        </div>
    )
}