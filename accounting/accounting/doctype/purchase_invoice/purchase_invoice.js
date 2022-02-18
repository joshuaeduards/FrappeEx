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

frappe.ui.form.on("Items Table", "item", function(frm, cdt, cdn){
		let item = locals[cdt][cdn];
		let rate = 10;
		item.rate = rate;
		frm.refresh_field('item_table');
	
})
