# Copyright (c) 2022, -- and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
	date_from = filters.get('sdate_f')
	date_to = filters.get('edate_f')

	# SET TABLE HEADER
	column = ["Account", "Debit", "Credit"] 

	if date_from != None and date_to != None:
		result = frappe.db.sql(f"""
				SELECT `account`, `debit_amount`, `credit_amount`
				FROM `tabGL Entry`
				WHERE `is_cancelled` = 0 
				AND `posting_date` BETWEEN %s AND %s
				GROUP BY `account`
			""", [date_from, date_to]	
		)
		return column, result
	else:
		result = frappe.db.sql(f"""
				SELECT `account`, SUM(`debit_amount`), SUM(`credit_amount`)
				FROM `tabGL Entry`
				WHERE `is_cancelled` = 0
				GROUP BY `account`"""
		)
		return column, result
