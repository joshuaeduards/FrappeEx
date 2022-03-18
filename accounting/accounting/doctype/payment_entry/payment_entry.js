// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt

frappe.ui.form.on('Payment Entry', 'onload', function(frm){

	function _filter(val = {}, field = ""){
		if(val != {} && field != ""){
			frm.set_query(field, function() {
				return { filters: val }
			})
		}
	}

	if(frm.doc.party_type === "Customer"){
		_filter({
			party_type: 'Asset',
			docstatus: 1,
			is_group: 0
		},	"account_paid_to");

		_filter({
			party_type: 'Asset',
			docstatus: 1,
			is_group: 0
		},	"account_paid_from");
	}

	if(rm.doc.party_type === "Supplier"){
		_filter({
			party_type: 'liability',
			docstatus: 1,
			is_group: 0
		},	"account_paid_to");

		_filter({
			party_type: 'Asset',
			docstatus: 1,
			is_group: 0
		},	"account_paid_from");
	}
})
