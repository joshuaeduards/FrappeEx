# Copyright (c) 2022, -- and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe

class PurchaseInvoice(Document):
	def on_submit(self):
		naming_series = f'{self.naming_series}'
		posting_date = f'{self.posting_date}'
		due_date = f'{self.payment_due_date}'
		#party link(transaction->invoice) -> party(naming_series) 
		party = f'{self.supplier}'
		amount = f'{self.total_amount}'
		name = f'{self.name}'
		voucher_number = name.split("-")[0]

		credit_to = f'{self.credit_to}'
		expense_account = f'{self.expense_account}'

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
			#'account': 'Inventory',
			'account': credit_to,
			'debit_amount': amount,
			'credit_amount': '',
			'is_cancelled': '',
			'voucher_type': 'Purchase Invoice',
			'voucher_number': naming_series
			})
		doc_inv.insert()

		doc_payable = frappe.get_doc({
			'doctype': 'GL Entry',
			'posting_date': posting_date,
			'due_date': due_date,
			'party': party,
			#'account': 'Product Expense',
			'account': expense_account,
			'debit_amount': '',
			'credit_amount': amount,
			'is_cancelled': '',
			'voucher_type': 'Purchase Invoice',
			'voucher_number': naming_series
			})
		doc_payable.insert()

		#JOURNAL ENTRY
		# doc_inv = frappe.get_doc({
		# 	'doctype': 'Journal Entry',
		# 	'naming_series': naming_series,
		# 	'party': party,
		# 	'posting_date': posting_date,
		# 	'account': 'Inventory',
		# 	'debit_amount': amount,
		# 	'credit_amount': '',
		# 	'is_cancelled': '',
		# 	'voucher_type': '',
		# 	'voucher_number': ''
		# 	})
		# doc_inv.insert()

		# doc_payable = frappe.get_doc({
		# 	'doctype': 'Journal Entry',
		# 	'posting_date': posting_date,
		# 	'due_date': due_date,
		# 	'party': party,
		# 	'account': 'Accounts Payable',
		# 	'debit_amount': '',
		# 	'credit_amount': amount,
		# 	'is_cancelled': '',
		# 	'voucher_type': '',
		# 	'voucher_number': ''	
		# 	})
		# doc_payable.insert()
		
