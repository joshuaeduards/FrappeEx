// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Journal Entry', 'onload', function(frm){
// 	frm.get_field("accounting_entries_table").grid.hide();
// 	// HIDE ADD ROW IN CHILD TABLE
// })
class SetFilter {
	constructor(frm, val = {}, field = "", fieldname = ""){
		this.frm = frm;
		this.val = val;
		this.field = field;
		this.fieldname = fieldname;
	}
	_filter(){
		if(this.val != {} && this.field != "" && this.fieldname != ""){
		(this.frm).set_query(this.field, this.fieldname, function() {
				return { filters: this.val }
			})
		}
	}
}
frappe.ui.form.on('Journal Entry', 'onload', function(frm){
	new SetFilter(frm, 
		{
		party: "Customer",
		is_group: 0
		}
	, "party_type"
	, "accounting_entries_table")._filter();
	refresh_field('party');
})

frappe.ui.form.on('Journal Entry', {
	party_type: function(frm){
		console.log(frm);

		if(frm.selected_doc.party_type === "Customer"){
			console.log("cust");
			new SetFilter(frm, 
				{
				party: "Customer",
				is_group: 0
				}
			, "party_type"
			, "accounting_entries_table")._filter();
			refresh_field('party');
		}
		if(frm.selected_doc.party_type === "Supplier"){
			new SetFilter({
				party: "Supplier",
				is_group: 0
			}
			, "party_type"
			, "accounting_entries_table")._filter();
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






