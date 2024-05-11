const labels = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
const ids = ['Years']
const pagination = {pageSize: 5, rowsPerPageOptions: 5, isPagination: true}
const exportTitle = {title: 'Population Table'}
export const data = {
    labels,
    ids,
    pagination,
    exportTitle,
    datasets: [{
        id: 1,
        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 6000],
        label: 'Andhra Pradesh',
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        borderColor: '#3e95cd',
        fill: true,
        tension: 0.4
    }, {
        id: 2,
        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
        label: 'Arunachal Pradesh',
        backgroundColor: 'rgba(255, 0, 255, 0.2)',
        borderColor: '#8e5ea2',
        fill: true,
        tension: 0.4
    }, {
        id: 3,
        data: [168, 170, 178, 190, 203, 1000, 408, 2000, 675, 4500],
        label: 'Uttar Pradesh',
        backgroundColor: 'rgba(0, 128, 128, 0.2)',
        borderColor: '#3cba9f',
        fill: true,
        tension: 0.4
    }, {
        id: 4,
        data: [40, 20, 1000, 16, 24, 2000, 74, 167, 508, 784],
        label: 'West Bengal',
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        borderColor: '#e8c3b9',
        fill: true,
        tension: 0.4
    }, {
        id: 5,
        data: [6, 3000, 2, 2, 7, 26, 82, 172, 312, 433],
        label: 'Maharashtra',
        backgroundColor: 'rgba(255, 255, 0, 0.2)',
        borderColor: '#c45850',
        fill: true,
        tension: 0.4
    }
    ]
}