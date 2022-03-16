# Copyright (c) 2022, -- and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe

class PurchaseInvoice(Document):
	def on_submit(self):
		posting_date = f'{self.posting_date}'
		due_date = f'{self.payment_due_date}'
		#party link(transaction->invoice) -> party(naming_series) 
		party = f'{self.supplier}'
		amount = f'{self.total_amount}'
		name = f'{self.name}'
		voucher_number = name.split("-")[0]

		credit_to = f'{self.credit_to}'
		expense_account = f'{self.expense_account}'

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
			'voucher_number': name
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
			'voucher_number': name
			})
		doc_payable.insert()
		
	def on_cancel(self):
		voucher_number = f'{self.name}'
		frappe.db.sql(f"""
			UPDATE `tabGL Entry` 
			SET is_cancelled = 1
			WHERE voucher_number = %s
		""", voucher_number)
		
		
