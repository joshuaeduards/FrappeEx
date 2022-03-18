// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt

frappe.ui.form.on('Purchase Invoice',  'validate',  function(frm) {
	let toDate = (date) => {
		return new Date(date);
	}

    if(toDate(frm.doc.posting_date) > toDate(frm.doc.payment_due_date)){
        msgprint({
			title: __('Message'),
			indicator: 'yellow',
			message: __('Due date cannot be earlier than the posting date')
		})
        validated = false;
    } 
});

frappe.ui.form.on('Purchase Invoice', {
	
	refresh: function(frm){
		let items_table = frm.doc.item_table;

		let total_qty = 0;
		let total_amount = 0;

		for(let i = 0; i < items_table.length; i++){
			let qty = items_table[i]['qty'];
			let amount = items_table[i]['amount'];
			total_qty += qty;
			total_amount += amount;
		}

		frm.set_value({
			total_qty: total_qty,
			total_amount: total_amount
		});
		frm.refresh_field('total_qty');
		frm.refresh_field('total_amount');
	}	
})

// frappe.ui.form.on("Items Table", "item", function(frm, cdt, cdn){
// 	let item = locals[cdt][cdn];
// 	let form = frm.selected_doc;
// 	// console.log(frm)
// 	// console.log(form);
// 	item.rate = form.rate;
// 	frm.refresh_field('items_table');
// })

function set_field_vals(frm, cdt, cdn){
	let item = locals[cdt][cdn];
	let form = frm.selected_doc;

	item.amount = '';
	item.amount = form.qty * form.rate;
	frm.refresh_field('items_table');
}


frappe.ui.form.on("Items Table", "qty", function(frm, cdt, cdn){
	set_field_vals(frm, cdt, cdn);
})

frappe.ui.form.on("Items Table", "item", function(frm, cdt, cdn){
	set_field_vals(frm, cdt, cdn);
})

frappe.ui.form.on("Items Table", "rate", function(frm, cdt, cdn){
	set_field_vals(frm, cdt, cdn);
})


frappe.ui.form.on('Purchase Invoice', 'onload', function(frm){
	
	// function naming_series(pre_name=""){
	// 	if(pre_name !== ""){
	// 		const date = new Date();
	// 		let naming_series = date.getFullYear()+'-'+
	// 							date.getMonth()+
	// 							date.getDate()+
	// 							date.getSeconds()+
	// 							date.getMilliseconds()
	// 		return pre_name+'-'+naming_series;
	// 	}
	// 	return;
	// }

	// const pre_name = "PI";
	// frm.set_value({
	// 	naming_series: naming_series(pre_name)
	// })

	frm.set_query('supplier', function() {
		return {
			filters: {
				party_type: 'Supplier',
				docstatus: 1,
				is_group: 0
			}
		}
	})

	frm.set_query('credit_to', function() {
		return {
			filters: {
				account_type: 'Liability',
				docstatus: 1,
				is_group: 0 
			}
		}
	})

	frm.set_query('expense_account', function() {
		return {
			filters: {
				account_type: 'Expense',
				docstatus: 1,
				is_group: 0
			}
		}
	})
})

frappe.ui.form.on('Items Table', {
	qty: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total_qty = 0;
		var total_amount = 0;
		frm.doc.items_table.forEach(function(d) {
			total_qty += d.qty;
			total_amount += d.amount;
		});
		frm.set_value("total_qty", total_qty);
		refresh_field('total_qty');

		frm.set_value("total_amount", total_amount);
		refresh_field('total_amount');
	},
	items_table_remove: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total_qty = 0;
		var total_amount = 0;
		frm.doc.items_table.forEach(function(d){
			total_qty += d.qty;
			total_amount += d.amount;
		});
		frm.set_value("total_qty", total_qty);
		refresh_field('total_qty');

		frm.set_value("total_amount", total_amount);
		refresh_field('total_amount');
	},
})
