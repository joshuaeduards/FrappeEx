// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt

frappe.ui.form.on('Payment Entry', {
	
	refresh: function(frm){
		let accounting_entries_table = frm.doc.accounting_entries_table;

		let total_debit = 0;
		let total_credit = 0;

		for(let i = 0; i < accounting_entries_table.length; i++){
			let debit = accounting_entries_table[i]['debit'];
			let credit = accounting_entries_table[i]['credit'];
			total_debit += debit;
			total_credit += credit;
		}

		frm.set_value({
			total_debit: total_debit,
			total_credit: total_credit
		});
		frm.refresh_field('total_debit');
		frm.refresh_field('total_credit');
	}	
})