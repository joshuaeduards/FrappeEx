// Copyright (c) 2022, -- and contributors
// For license information, please see license.txt

frappe.ui.form.on('Item', 'onload', function(){
    frappe.call({
        method: "accounting.accounting.doctype.item.item.rate_settings",
        callback: function(r){
            console.log(r);
        }
    })

})

