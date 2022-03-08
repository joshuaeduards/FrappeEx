// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt

frappe.ui.form.on('Fiscal Year', 'validate', function(frm) {
	if(frm.doc.start_date > frm.doc.end_date){
		frappe.msgprint("Start Date must not greate than End Date");
		validated = false;
	}
});


