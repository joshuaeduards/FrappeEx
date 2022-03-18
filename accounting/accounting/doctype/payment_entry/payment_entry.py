# Copyright (c) 2022, -- and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe

class PaymentEntry(Document):
	def on_submit(self):
		posting_date = f'{self.posting_date}'
		party = f'{self.party}'
		amount = f'{self.amount}'
		name = f'{self.name}'
		docname = f'{self.doctype}'
		account_paid_from = f'{self.account_paid_from}'
		account_paid_to = f'{self.account_paid_to}'

		#GENERAL LEDGER
		doc_inv = frappe.get_doc({
			'doctype': 'GL Entry',
			'posting_date': posting_date,
			'due_date': '',
			'party': party,
			# 'account': 'Cash',
			'account': account_paid_to,
			'debit_amount': amount,
			'credit_amount': '',
			'is_cancelled': '',
			'voucher_type': docname,
			'voucher_number': name
			})
		doc_inv.insert()

		doc_payable = frappe.get_doc({
			'doctype': 'GL Entry',
			'posting_date': posting_date,
			'due_date': '',
			'party': party,
			# 'account': 'Inventory',
			'account': account_paid_from,
			'debit_amount': '',
			'credit_amount': amount,
			'is_cancelled': '',
			'voucher_type': docname,
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
