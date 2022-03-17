
frappe.query_reports['General Ledger'] = {
    'filters': [
        {
            "fieldname": "sdate_f",
            "label": __("Date From"),
            "fieldtype": "Date",
            "default": '',
        },
        {
            "fieldname": "edate_f",
            "label": __("Date To"),
            "fieldtype": "Date",
            "default": ''
        }
    ]
}