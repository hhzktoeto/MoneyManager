export default function BudgetProgress() {
    return (
        <div className="bg-white p-5 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Budget Progress</h2>
                <button
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition duration-300">November
                </button>
            </div>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Housing</span>
                        <span className="text-sm text-gray-600">$856 / $1000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary-600 h-2.5 rounded-full"
                             style={{width: '85.6%'}}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Food</span>
                        <span className="text-sm text-gray-600">$670 / $600</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{width: '111.7%'}}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Transport</span>
                        <span className="text-sm text-gray-600">$432 / $500</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary-600 h-2.5 rounded-full"
                             style={{width: '86.4%'}}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Entertainment</span>
                        <span className="text-sm text-gray-600">$382 / $400</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary-600 h-2.5 rounded-full"
                             style={{width: '95.5%'}}></div>
                    </div>
                </div>
            </div>
            <button
                className="mt-6 text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">edit</span>
                Set budget goals
            </button>
            {/* Next: "Add monthly budget comparison" */}
        </div>
    );
}