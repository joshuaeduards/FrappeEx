import frappe

@frappe.whitelist()
def get_item_rate(item_code):
    sales_invoice = frappe.db.sql(""" SELECT rate FROM `tabSales Invoice` WHERE item_code = `{item_code}` """, as_dict=True)
    return sales_invoice

@frappe.whitelist()
def get_all_roles():
    return "return"