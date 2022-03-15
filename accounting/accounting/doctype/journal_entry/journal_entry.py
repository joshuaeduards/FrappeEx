# Copyright (c) 2022, -- and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe

class JournalEntry(Document):
	def on_submit(self):
			posting_date = f'{self.posting_date}'

			#party link(transaction->invoice) -> party(naming_series) 
			party = f'{self.party}'
			amount = f'{self.amount}'
			total_debit = f'{self.total_debit}'
			total_credit = f'{self.total_credit}'
			name = f'{self.name}'

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
				'account': 'Cash',
				'debit_amount': total_debit,
				'credit_amount': '',
				'is_cancelled': '',
				'voucher_type': 'Journal Entry',
				'voucher_number': name
				})
			doc_inv.insert()

			doc_payable = frappe.get_doc({
				'doctype': 'GL Entry',
				'posting_date': posting_date,
				'due_date': '',
				'party': party,
				'account': 'Inventory',
				'debit_amount': '',
				'credit_amount': total_credit,
				'is_cancelled': '',
				'voucher_type': 'Journal Entry',
				'voucher_number': name
				})
			doc_payable.insert()
