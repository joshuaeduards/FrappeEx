// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Sales Invoice', {
	
// 	refresh: function(frm){
// 		let item_table = frm.doc.item_table;

// 		let total_qty = 0;
// 		let total_amount = 0;

// 		for(let i = 0; i < item_table.length; i++){
// 			let qty = item_table[i]['qty'];
// 			let amount = item_table[i]['amount'];
// 			total_qty += qty;
// 			total_amount += amount;
// 		}

// 		frm.set_value({
// 			total_qty: total_qty,
// 			total_amount: total_amount
// 		});
// 		frm.refresh_field('total_qty');
// 		frm.refresh_field('total_amount');
// 	}	
// })

frappe.ui.form.on("Items Table", "item", function(frm, cdt, cdn){
		let item = locals[cdt][cdn];
		let form = frm.selected_doc;
		console.log(frm)
		console.log(form);
		item.rate = form.rate;
		frm.refresh_field('item_table');

		if((form.item).length > 0){
			console.log("has table row");
			frappe.call({
				method: "accounting.accounting.doctype.sales_invoice.sales_invoice.get_item_rate",
				args: {item_code: form.item}
			}).done((r) => {
				// console.log(r);
				// let rate = r.message[0][0];
				// console.log(rate);
				// frm.set_value({
				// 	rate: rate
				// });
				// frm.refresh_field('item_table');
			})
		}
})





