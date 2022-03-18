// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Journal Entry', 'onload', function(frm){
// 	frm.get_field("accounting_entries_table").grid.hide();
// 	// HIDE ADD ROW IN CHILD TABLE
// })


frappe.ui.form.on('Journal Entry', 'onload', function(frm){
	let df_account = frappe.meta.get_docfield("Accounting Entries Table", "account", frm.doc.name)
	df_account.read_only = 1;

	let df_party = frappe.meta.get_docfield("Accounting Entries Table", "party", frm.doc.name)
	df_party.read_only = 1;

	frm.set_query("account", "accounting_entries_table", function(frm){
		return {
			filters: {
				docstatus: 1,
				is_group: 0
				}
		}
	})
	refresh_field('account');
})

frappe.ui.form.on('Journal Entry', {
	party_type: function(frm){
		console.log(frm);

		if(frm.selected_doc.party_type === "Customer"){
			let df_account= frappe.meta.get_docfield("Accounting Entries Table", "account", frm.doc.name)
			df_account.read_only = 0;

			let df_party = frappe.meta.get_docfield("Accounting Entries Table", "party", frm.doc.name)
			df_party.read_only = 0;

			frm.set_query("party", "accounting_entries_table", function(frm){
				return {
					filters: {
						party_type: "Customer",
						docstatus: 1,
						}
				}
			})
			refresh_field('party');
		}
		if(frm.selected_doc.party_type === "Supplier"){
			let df_account= frappe.meta.get_docfield("Accounting Entries Table", "account", frm.doc.name)
			df_account.read_only = 0;

			let df_party = frappe.meta.get_docfield("Accounting Entries Table", "party", frm.doc.name)
			df_party.read_only = 0;

			frm.set_query("party", "accounting_entries_table", function(frm){
				return {
					filters: {
						party_type: "Supplier",
						docstatus: 1,
						}
				}
			})
			refresh_field('party');
		}
	},
});

frappe.ui.form.on('Accounting Entries Table', {
	debit: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total = 0;
		frm.doc.accounting_entries_table.forEach(function(d) {
			total += d.debit;
		});
		frm.set_value("total_debit", (total === NaN ? 0 : total));
		refresh_field('total_debit');


		let diff = (total === NaN ? 0 : total) - frm.doc.total_credit;
		frm.set_value("difference", diff);
		refresh_field('difference');

	},
	credit: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total = 0;
		frm.doc.accounting_entries_table.forEach(function(d) {
			total += d.credit;
		});
		frm.set_value("total_credit", total === NaN ? 0 : total);
		refresh_field('total_credit');

	
		let diff = frm.doc.total_debit - (total === NaN ? 0 : total);
		frm.set_value("difference", diff);
		refresh_field('difference');
	},
	accounting_entries_table_remove: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total = 0;
		frm.doc.accounting_entries_table.forEach(function(d){
			total += d.debit;
		});
		frm.set_value('total_debit', (total === NaN ? 0 : total));
		refresh_field('total_debit');
	},
	accounting_entries_table_remove: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total = 0;
		frm.doc.accounting_entries_table.forEach(function(d){
			total += d.credit;
		});
		frm.set_value('total_credit', total === NaN ? 0 : total);
		refresh_field('total_credit');
	}

})






