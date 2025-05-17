import Chart from "react-apexcharts";

export default function MonthlyOverview() {
    return (
        <div className="md:col-span-2 bg-white p-5 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Monthly Overview</h2>
                <div className="relative">
                    <details className="group">
                        <summary
                            className="list-none flex items-center gap-1 cursor-pointer bg-gray-100 rounded-lg px-3 py-1 hover:bg-gray-200 transition duration-300">
                            <span className="text-sm">Last 6 months</span>
                            <span
                                className="material-symbols-outlined text-sm transition-transform duration-300 group-open:rotate-180">expand_more</span>
                        </summary>
                        <div
                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                            <ul className="py-1">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Last 3
                                    months
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Last 6
                                    months
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Last 12
                                    months
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Custom
                                    range
                                </li>
                            </ul>
                        </div>
                    </details>
                </div>
            </div>
            <div>
                <Chart
                    type="bar"
                    height={280}
                    width="100%"
                    series={[
                        {
                            name: 'Доход',
                            data: [3500, 3700, 3900, 3450, 4100, 4250]
                        },
                        {
                            name: 'Расход',
                            data: [2100, 2350, 2700, 2450, 2650, 2846]
                        }
                    ]}
                    options={{
                        chart: {
                            stacked: false,
                            toolbar: {
                                show: true,
                                offsetX: 10
                            },
                            zoom: {
                                enabled: false
                            }
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '50%',
                                borderRadius: 4
                            },
                        },
                        colors: ['rgba(151,208,144,0.95)', 'rgba(224,140,140,0.95)'],
                        xaxis: {
                            categories: ['June', 'July', 'August', 'September', 'October', 'November'],
                        },
                        legend: {
                            position: 'bottom',
                            horizontalAlign: 'right'
                        },
                        dataLabels: {
                            enabled: false
                        },
                        grid: {
                            borderColor: '#e8e8e8'
                        },
                        tooltip: {
                            shared: true,
                            intersect: false
                        }
                    }}
                />
            </div>
        </div>
    );
}