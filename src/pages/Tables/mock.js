export default {
    employeeTable: {
        selected: [],
        search: '',
        headers: [
            {
                text: 'Bedrijf',
                align: 'start',
                sortable: true,
                value: 'company',
            },
            { text: 'E-mail', value: 'email' },
        ],
        clients: [],
    },
    menu: [
        'Edit',
        'Copy',
        'Delete',
        'Print'
    ]
}
