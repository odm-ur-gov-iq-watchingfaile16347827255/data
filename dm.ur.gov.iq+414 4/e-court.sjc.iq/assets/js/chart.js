function ARGsChart_Daily(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#DailyARGsChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                }
            ]
        }
    ]);
}

function ARGsChart_Weekly(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#WeeklyARGsChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                }
            ]
        }
    ]);
}

function ARGsChart_Monthly(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#MonthlyARGsChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                }
            ]
        }
    ]);
}


function QSMChart_Daily(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#DailyQSMChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                }
            ]
        }
    ]);
}

function QSMChart_Weekly(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#WeeklyQSMChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                }
            ]
        }
    ]);
}

function QSMChart_Monthly(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#MonthlyQSMChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                }
            ]
        }
    ]);
}


function MCChart_Daily(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            },
            {
                name: legend[2],
                data: value[2]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#DailyMCChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                },
                {
                    name: legend[2],
                    data: value[2]
                }
            ]
        }
    ]);
}

function MCChart_Weekly(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            },
            {
                name: legend[2],
                data: value[2]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#WeeklyMCChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                },
                {
                    name: legend[2],
                    data: value[2]
                }
            ]
        }
    ]);
}

function MCChart_Monthly(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            },
            {
                name: legend[2],
                data: value[2]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#MonthlyMCChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                },
                {
                    name: legend[2],
                    data: value[2]
                }
            ]
        }
    ]);
}

function UnderageMCChart_Monthly(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#MonthlyUnderageMCChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                }
            ]
        }
    ]);
}


function CASEChart_Daily(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            },
            {
                name: legend[2],
                data: value[2]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#DailyCASEChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                },
                {
                    name: legend[2],
                    data: value[2]
                }
            ]
        }
    ]);
}

function CASEChart_Weekly(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#WeeklyCASEChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                }
            ]
        }
    ]);
}

function CASEChart_Monthly(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            },
            {
                name: legend[1],
                data: value[1]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#MonthlyCASEChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                },
                {
                    name: legend[1],
                    data: value[1]
                }
            ]
        }
    ]);
}


function MCDivorcedChart_Daily(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#DailyMCDivorcedChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                }
            ]
        }
    ]);
}

function MCDivorcedChart_Weekly(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#WeeklyMCDivorcedChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                }
            ]
        }
    ]);
}

function MCDivorcedChart_Monthly(value, label, title, legend, axis) {
    var options = {
        series: [
            {
                name: legend[0],
                data: value[0]
            }
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: title,
            align: 'right'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: label,
            title: {
                text: axis[0]
            }
        },
        yaxis: {
            title: {
                text: axis[1]
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#MonthlyMCDivorcedChart"), options);
    chart.render();
    chart.updateOptions([
        {
            series: [
                {
                    name: legend[0],
                    data: value[0]
                }
            ]
        }
    ]);
}