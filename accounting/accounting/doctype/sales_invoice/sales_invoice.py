# Copyright (c) 2022, -- and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe

class SalesInvoice(Document):
	def on_submit(self):
		posting_date = f'{self.posting_date}'
		due_date = f'{self.payment_due_date}'
		#party link(transaction->invoice) -> party(naming_series) 
		party = f'{self.customer}'
		amount = f'{self.total_amount}'

		# items_table = f'{self.items_table}'
		# for x in items_table:
		# 	x['item']

		#FOR SUBLEDGER
		#########################
		
		#GENERAL LEDGER
		doc_inv = frappe.get_doc({
			'doctype': 'GL Entry',
			'posting_date': posting_date,
			'due_date': due_date,
			'party': party,
			'account': 'Inventory',
			'debit_amount': amount,
			'credit_amount': '',
			'is_cancelled': '',
			'voucher_type': '',
			'voucher_number': ''
			})
		doc_inv.insert()

		doc_cash = frappe.get_doc({
			'doctype': 'GL Entry',
			'posting_date': posting_date,
			'due_date': due_date,
			'party': party,
			'account': 'Cash',
			'debit_amount': '',
			'credit_amount': amount,
			'is_cancelled': '',
			'voucher_type': '',
			'voucher_number': ''	
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

@frappe.whitelist()
def get_item_rate(item_code):
    sales_invoice = frappe.db.sql(""" SELECT rate FROM `tabSales Invoice` WHERE item_code = `{item_code}` """, as_dict=True)
    return sales_invoice