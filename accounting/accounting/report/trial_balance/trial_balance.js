// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Trial Balance"] = {
	"filters": [
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
};
