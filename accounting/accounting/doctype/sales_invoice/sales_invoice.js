// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt
 
frappe.ui.form.on('Sales Invoice', 'validate', function(frm) {
	let toDate = (date) => {
		return new Date(date);
	}

    if(toDate(frm.doc.posting_date) > toDate(frm.doc.payment_due_date)){
		msgprint({
			title: __('Message'),
			indicator: 'yellow',
			message: __('Due date cannot be earlier than the posting date')
		});
		validated = false;
	}
});

frappe.ui.form.on('Sales Invoice', {
	qty: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total = 0;
		// console.log(frm);
		frm.doc.item_table.forEach(function(d){
			total += d.qty;
		});
		frm.set_value('total_qty', total)
		refresh_field('total_qty');
	},
	amount: function(frm){
		var d = locals[cdt][cdn];
		var total_amount = 0;

		frm.doc.item_table.forEach(function(d){
			total_amount += d.qty;
		})
		frm.set_value('total_qty', total_amount)
		refresh_field('total_qty');
	}	
})

function set_field_vals(frm, cdt, cdn){
	let item = locals[cdt][cdn];
	let form = frm.selected_doc;

	item.amount = '';
	item.amount = form.qty * form.rate;
	frm.refresh_field('item_table');
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

frappe.ui.form.on('Sales Invoice', 'refresh', function(frm, cdt, cdn){
	frappe.db.get_single_value('Sales Invoice Rate Settings', 'is_rate_editable').then(response => {
		console.log(response);
		console.log("editable");
		// frm.set_df_property('rate', 'read_only', response === 1 ? 0 : 1);
		let df = frappe.meta.get_docfield("Items Table", "rate", frm.doc.name)
		// console.log(df);
		df.read_only = (response === 1 ? 0 : 1);
		console.log(df);

		console.log("end");
		frm.refresh_field('rate');
		
	})
})

// frappe.ui.form.on("Items Table", "refresh", function(frm, cdt, cdn){
// 	let item = locals[cdt][cdn];
// 	let form = frm.selected_doc;
// 	console.log("cdt");
// 	console.log(cdt);
// 	console.log("cdn");
// 	console.log(cdn);

// 	frappe.db.get_single_value('Sales Invoice Rate Settings', 'is_rate_editable').then(response => {
// 		console.log(response)
// 		console.log("editable")
// 		console.log(item);
		
// 		item.set_df_property('rate', 'read_only', response === 1 ? 0 : 1);

// 		item.refresh_field('item_table');
// 		console.log("end");
// 	})
// })

frappe.ui.form.on('Sales Invoice', 'onload', function(frm){
	
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

	// const pre_name = "SI";
	// frm.set_value({
	// 	naming_series: naming_series(pre_name)
	// })

	frm.set_query('customer', function() {
		return {
			filters: {
				party_type: 'Customer' 
			}
		}
	})

	frm.set_query('debit_to', function() {
		return {
			filters: {
				account_type: 'Asset',
			}
		}
	})

	frm.set_query('income_account', function() {
		return {
			filters: {
				account_type: 'Income',
			}
		}
	})
})

frappe.ui.form.on('Items Table', {
	item: function(frm, cdt, cdn){
		refresh_field('rate');
	},
	qty: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total_qty = 0;
		var total_amount = 0;
		frm.doc.item_table.forEach(function(d) {
			total_qty += d.qty;
			total_amount += d.amount;
		});
		frm.set_value("total_qty", total_qty);
		refresh_field('total_qty');

		frm.set_value("total_amount", total_amount);
		refresh_field('total_amount');
		refresh_field('rate');
	},
	item_table_remove: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var total_qty = 0;
		var total_amount = 0;
		frm.doc.accounting_entries_table.forEach(function(d){
			total_qty += d.qty;
			total_amount += d.amount;
		});
		frm.set_value("total_qty", total_qty);
		refresh_field('total_qty');

		frm.set_value("total_amount", total_amount);
		refresh_field('total_amount');

		refresh_field('rate');

	},
})

/* REQUEST SAMPLE*/
// if((form.item).length > 0){
// 	console.log("has table row");
// 	frappe.call({
// 		method: "accounting.accounting.doctype.sales_invoice.sales_invoice.get_item_rate",
// 		args: {item_code: form.item}
// 	}).done((r) => {
// 		// console.log(r);
// 		// let rate = r.message[0][0];
// 		// console.log(rate);
// 		// frm.set_value({
// 		// 	rate: rate
// 		// });
// 		// frm.refresh_field('item_table');
// 	})
// }




