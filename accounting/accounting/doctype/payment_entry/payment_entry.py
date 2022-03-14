# Copyright (c) 2022, -- and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe

class PaymentEntry(Document):
		def on_submit(self):
			naming_series = f'{self.naming_series}'
			posting_date = f'{self.posting_date}'

			#party link(transaction->invoice) -> party(naming_series) 
			party = f'{self.party}'
			amount = f'{self.amount}'
			name = f'{self.name}'
			voucher_number = name.split("-")[0]

			# items_table = f'{self.items_table}'
			# for x in items_table:
			# 	x['item']

			#FOR SUBLEDGER
			#########################

			#GENERAL LEDGER
			doc_inv = frappe.get_doc({
				'doctype': 'GL Entry',
				'posting_date': posting_date,
				'due_date': '',
				'party': party,
				# 'account': 'Cash',
				'account': naming_series,
				'debit_amount': amount,
				'credit_amount': '',
				'is_cancelled': '',
				'voucher_type': 'Payment Entry',
				'voucher_number': 'PE'+str(voucher_number)
				})
			doc_inv.insert()

			doc_payable = frappe.get_doc({
				'doctype': 'GL Entry',
				'posting_date': posting_date,
				'due_date': '',
				'party': party,
				# 'account': 'Inventory',
				'account': naming_series,
				'debit_amount': '',
				'credit_amount': amount,
				'is_cancelled': '',
				'voucher_type': 'Payment Entry',
				'voucher_number': 'PE'+str(voucher_number)	
				})
			doc_payable.insert()
