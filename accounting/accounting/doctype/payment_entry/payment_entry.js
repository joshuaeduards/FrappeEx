// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt

frappe.ui.form.on('Payment Entry', {
	
	refresh: function(frm){
		// let accounting_entries_table = frm.doc.accounting_entries_table;

		// let total_debit = 0;
		// let total_credit = 0;

		// for(let i = 0; i < accounting_entries_table.length; i++){
		// 	let debit = accounting_entries_table[i]['debit'];
		// 	let credit = accounting_entries_table[i]['credit'];
		// 	total_debit += debit;
		// 	total_credit += credit;
		// }

		// frm.set_value({
		// 	total_debit: total_debit,
		// 	total_credit: total_credit
		// });
		// frm.refresh_field('total_debit');
		// frm.refresh_field('total_credit');
	}	
})

frappe.ui.form.on('Payment Entry', 'onload', function(frm){
	
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

	const pre_name = "PE";
	frm.set_value({
		naming_series: naming_series(pre_name)
	})

	// frm.set_query('supplier', function() {
	// 	return {
	// 		filters: {
	// 			party_type: 'Supplier' 
	// 		}
	// 	}
	// })

	// frm.set_query('credit_to', function() {
	// 	return {
	// 		filters: {
	// 			account_type: 'Liability' 
	// 		}
	// 	}
	// })

	// frm.set_query('expense_account', function() {
	// 	return {
	// 		filters: {
	// 			account_type: 'Expense' 
	// 		}
	// 	}
	// })
})