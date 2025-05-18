import Chart from "react-apexcharts";

export default function CategoriesSpending() {
    return (
        <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Spending Categories</h2>
            <div className="h-[300px]">
                <Chart
                    type="donut"
                    height={280}
                    width="100%"
                    series={[856, 670, 432, 382, 298, 208]}
                    options={{
                        labels: ['Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Others'],
                        chart: {
                            toolbar: {
                                show: false
                            }
                        },
                        colors: ['primary-600', 'primary-400', 'neutral-500', 'neutral-400', 'primary-300', 'neutral-300'],
                        legend: {
                            position: 'bottom'
                        },
                        dataLabels: {
                            enabled: false
                        },
                        plotOptions: {
                            pie: {
                                donut: {
                                    size: '60%'
                                }
                            }
                        }
                    }}
                />
            </div>
            {/* Next: "Add category-wise spending details section" */}
        </div>
    );
}