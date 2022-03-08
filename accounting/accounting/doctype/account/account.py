# Copyright (c) 2022, -- and contributors
# For license information, please see license.txt

# import frappe
from frappe.utils.nestedset import NestedSet
from frappe.model.naming import getseries
import frappe 

class Account(NestedSet):
	def autoname(self):
		customname = '{0}-{1}'.format(self.account_number, self.account_name) 
		self.name = customname
