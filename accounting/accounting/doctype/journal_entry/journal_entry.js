// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt

frappe.ui.form.on('Journal Entry', 'onload', function(frm){
	console.log('test');
	// refresh: function(frm) {
	function naming_series(pre_name=""){
		if(pre_name !== ""){
			const date = new Date();
			let naming_series = date.getFullYear()+'-'+
								date.getMonth()+
								date.getDate()+
								date.getSeconds()+
								date.getMilliseconds()
			return pre_name+'-'+naming_series;
		}
		return;
	}

	const pre_name = "JE";
	frm.set_value({
		naming_series: naming_series(pre_name)
	})
	// }
});


frappe.ui.form.on('Accounting Entries Table', {
	debit: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total = 0;
		frm.doc.accounting_entries_table.forEach(function(d) {
			total += d.debit;
		});
		frm.set_value("total_debit", total);
		refresh_field('total_debit');


		let diff = total - frm.doc.total_credit;
		frm.set_value("difference", diff);
		refresh_field('difference');

	},
	credit: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total = 0;
		frm.doc.accounting_entries_table.forEach(function(d) {
			total += d.credit;
		});
		frm.set_value("total_credit", total);
		refresh_field('total_credit');

	
		let diff = frm.doc.total_debit - total;
		frm.set_value("difference", diff);
		refresh_field('difference');
	},
	accounting_entries_table_remove: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total = 0;
		frm.doc.accounting_entries_table.forEach(function(d){
			total += d.debit;
		});
		frm.set_value('total_debit', total);
		refresh_field('total_debit');
	},
	accounting_entries_table_remove: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total = 0;
		frm.doc.accounting_entries_table.forEach(function(d){
			total += d.credit;
		});
		frm.set_value('total_credit', total);
		refresh_field('total_credit');
	}

})






