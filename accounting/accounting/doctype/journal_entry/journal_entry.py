# Copyright (c) 2022, -- and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe

class JournalEntry(Document):
	def on_submit(self):
		posting_date = f'{self.posting_date}'
		docname = f'{self.doctype}'
		name = f'{self.name}'

		accounting_entries_table = self.accounting_entries_table

		for x in accounting_entries_table:
			account = x.account
			party = x.party
			debit = x.debit
			credit = x.credit

			#GENERAL LEDGER
			if debit > 0 or debit is "":
				doc_inv = frappe.get_doc({
					'doctype': 'GL Entry',
					'posting_date': posting_date,
					'due_date': '',
					'party': party,
					'account': account,
					'debit_amount': debit,
					'credit_amount': '',
					'is_cancelled': '',
					'voucher_type': docname,
					'voucher_number': name
					})
				doc_inv.insert()
			
			if credit > 0 or credit is "":
				doc_payable = frappe.get_doc({
					'doctype': 'GL Entry',
					'posting_date': posting_date,
					'due_date': '',
					'party': party,
					'account': account,
					'debit_amount': '',
					'credit_amount': credit,
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
