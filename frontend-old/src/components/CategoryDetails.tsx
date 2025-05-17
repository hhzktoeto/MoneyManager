export default function CategoryDetails() {
    return (
        <div className="bg-white p-5 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Category Details</h2>
                <select
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg cursor-pointer">
                    <option>Housing</option>
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Entertainment</option>
                    <option>Utilities</option>
                </select>
            </div>
            <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <div
                            className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                            <span
                                                className="material-symbols-outlined text-primary-600 text-sm">home</span>
                        </div>
                        <div>
                            <div className="font-medium">Rent</div>
                            <div className="text-xs text-gray-500">Nov 15, 2023</div>
                        </div>
                    </div>
                    <span className="text-red-500 font-medium">$1,200.00</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <div
                            className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                            <span
                                                className="material-symbols-outlined text-primary-600 text-sm">electric_bolt</span>
                        </div>
                        <div>
                            <div className="font-medium">Electricity</div>
                            <div className="text-xs text-gray-500">Nov 10, 2023</div>
                        </div>
                    </div>
                    <span className="text-red-500 font-medium">$89.75</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <div
                            className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                            <span
                                                className="material-symbols-outlined text-primary-600 text-sm">water_drop</span>
                        </div>
                        <div>
                            <div className="font-medium">Water</div>
                            <div className="text-xs text-gray-500">Nov 5, 2023</div>
                        </div>
                    </div>
                    <span className="text-red-500 font-medium">$45.20</span>
                </div>
            </div>
            <div className="mt-6 flex justify-between">
                <span className="font-medium">Total Spent</span>
                <span className="font-medium">$1,334.95</span>
            </div>
            {/* Next: "Add category comparison analytics" */}
        </div>
    );
}