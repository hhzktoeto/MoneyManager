import Header from "./Header.tsx";
import AddTransaction from "./forms/AddTransaction.tsx";
import CurrentBalance from "./cards/CurrentBalance.tsx";
import Incomes from "./cards/Incomes.tsx";
import Expenses from "./cards/Expenses.tsx";
import MonthlyOverview from "./charts/MonthlyOverview.tsx";
import CategoriesSpending from "./charts/CategoriesSpending.tsx";
import BudgetProgress from "./BudgetProgress.tsx";
import CategoryDetails from "./CategoryDetails.tsx";
import TransactionsHistory from "./forms/TransactionsHistory.tsx";
import {useState} from "react";
import {ShowPeriod} from "../util/TransactionsUtils.ts";
import {showPeriodMutation} from "../hooks/showPeriod.ts";

const Tab = {
    Main: "Главная",
    Stats: "Статистика"
};

type Tab = typeof Tab[keyof typeof Tab];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Main);
    const {mutate: changeShowPeriod} = showPeriodMutation();

    return (
        <div id="webcrumbs">
            <div className="w-full p-6 bg-gradient-to-br from-slate-50 to-slate-100 font-sans rounded-xl shadow-lg">
                <Header/>

                <div className="flex space-x-4 mb-4 gap-2">
                    {
                        Object.values(Tab).map(tab => {
                            return (
                                <button
                                    key={tab}
                                    className={`px-4 py-2 rounded-full text-sm font-medium mb-2 ${
                                        activeTab === tab
                                            ? "bg-primary-600 text-white shadow-md"
                                            : "bg-gray-200 text-gray-600 hover:bg-gray-200"
                                    }`}
                                    onClick={() => setActiveTab(tab)}>
                                    {tab}
                                </button>
                            );
                        })
                    }
                    <div className="flex-grow flex justify-end">
                        <select
                            onChange={(e) => changeShowPeriod(e.target.value as ShowPeriod)}
                            className="w-auto py-2 px-2 border rounded-lg text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400">
                            {
                                Object.values(ShowPeriod).map(option =>
                                    <option key={option}>{option}</option>
                                )
                            }
                        </select>
                    </div>
                </div>

                {
                    activeTab === Tab.Main && (
                        <>
                            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                                <AddTransaction/>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <CurrentBalance/>
                                <Incomes/>
                                <Expenses/>
                            </div>

                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <TransactionsHistory/>
                            </div>
                        </>
                    )
                }

                {
                    activeTab === Tab.Stats && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <BudgetProgress/>
                                <CategoryDetails/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <MonthlyOverview/>
                                <CategoriesSpending/>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}