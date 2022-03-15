# Copyright (c) 2022, -- and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe
import time
from datetime import datetime

class SalesInvoice(Document):
	def on_submit(self):
		posting_date = f'{self.posting_date}'
		due_date = f'{self.payment_due_date}'
		party = f'{self.customer}'
		amount = f'{self.total_amount}'
		name = f'{self.name}'
		gl_name = name.split("-")[0]

		debit_to = f'{self.debit_to}'
		income_account = f'{self.income_account}'
		
		#GENERAL LEDGER
		doc_inv = frappe.get_doc({
			'doctype': 'GL Entry',
			'name': 'test',
			'posting_date': posting_date,
			'due_date': due_date,
			'party': party,
			'account': debit_to,
			'debit_amount': amount,
			'credit_amount': '',
			'is_cancelled': '',
			'voucher_type': 'Sales Invoice',
			'voucher_number': name
			})
		doc_inv.insert()

		doc_cash = frappe.get_doc({
			'doctype': 'GL Entry',
			'name': 'test',
			'posting_date': posting_date,
			'due_date': due_date,
			'party': party,
			'account': income_account,
			'debit_amount': '',
			'credit_amount': amount,
			'is_cancelled': '',
			'voucher_type': 'Sales Invoice',
			'voucher_number': name
			})
		doc_cash.insert()

		#JOURNAL ENTRY
		# doc_inv = frappe.get_doc({
		# 	'doctype': 'Journal Entry',
		# 	'posting_date': posting_date,
		# 	'due_date': due_date,
		# 	'party': party,
		# 	'account': 'Inventory',
		# 	'debit_amount': amount,
		# 	'credit_amount': '',
		# 	'is_cancelled': '',
		# 	'voucher_type': '',
		# 	'voucher_number': ''
		# 	})
		# doc_inv.insert()

		# doc_cash = frappe.get_doc({
		# 	'doctype': 'Journal Entry',
		# 	'posting_date': posting_date,
		# 	'due_date': due_date,
		# 	'party': party,
		# 	'account': 'Cash',
		# 	'debit_amount': '',
		# 	'credit_amount': amount,
		# 	'is_cancelled': '',
		# 	'voucher_type': '',
		# 	'voucher_number': ''	
		# 	})
		# doc_cash.insert()
	def on_cancel(self):
		doc = f'{self.doc}'
		name = f'{self.name}'
		# frappe.db.set_value('GL Entry', name, 'is_cancelled', 1)

		# auto create another document
		# if doc.allocated_to:
		# doc.status = 'Closed'
	# def autoname(self):
	# 	naming_series = f'{self.naming_series}'
	# 	frappe.db.set_value('GL Entry', naming_series, 'is_cancelled', True)

# @frappe.whitelist()
# def get_item_rate(item_code):
# 	sales_invoice = frappe.db.sql("SELECT standard_selling_rate FROM `tabItem` WHERE name = %s;", item_code)
# 	return sales_invoice
# 	# return "testing"

# @frappe.whitelist()
# def rate_settings():
# 	is_editable = frappe.db.sql("SELECT `Sales Invoice Rate Settings` FROM `tabSingles`")
# 	return is_editable
# 	# return "testing"

	