$(document).ready(function () {
    if ($("#alertSuccess").text().trim() == "") {
        $("#alertSuccess").hide();
    }
    $("#alertError").hide();
});




$(document).on("click", "#saveinvoice", function (event) {
    // Clear alerts---------------------
    $("#alertSuccess").text("");
    $("#alertSuccess").hide();
    $("#alertError").text("");
    $("#alertError").hide();
    // Form validation-------------------
    var status = validateInvoiceForm();
    if (status != true) {
        $("#alertError").text(status);
        $("#alertError").show();
        return;
    }
    // If valid------------------------
    var type = ($("#hiddenIDSave2").val() == "") ? "POST" : "PUT";
    $.ajax(
        {
            url: "InvoiceClientAPI",
            type: type,
            data: $("#invoiceform").serialize(),
            dataType: "text",
            complete: function (response, status) {
                onInvoiceSaveComplete(response.responseText, status);
            }
        });
});

function onInvoiceSaveComplete(response, status) {
    if (status == "success") {
        var resultSet = JSON.parse(response);
        if (resultSet.status.trim() == "success") {
            $("#alertSuccess").text("Successfully saved.");
            $("#alertSuccess").show();
            $("#divInvoiceGrid").html(resultSet.data);
        } else if (resultSet.status.trim() == "error") {
            $("#alertError").text(resultSet.data);
            $("#alertError").show();
        }
    } else if (status == "error") {
        $("#alertError").text("Error while saving.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error while saving..");
        $("#alertError").show();
    }
    $("#hiddenIDSave2").val("");
    $("#invoiceform")[0].reset();
}

$(document).on("click", ".btnUpdate", function (event) {
    $("#hiddenIDSave2").val($(this).data("id"));
    $("#amount").val($(this).closest("tr").find('td:eq(1)').text());
    $("#research_id").val($(this).closest("tr").find('td:eq(2)').text());
    $("#date").val($(this).closest("tr").find('td:eq(3)').text());
    $("#cus_id").val($(this).closest("tr").find('td:eq(4)').text());
});

$(document).on("click", ".btnRemove", function (event) {
    $.ajax(
        {
            url: "InvoiceClientAPI",
            type: "DELETE",
            data: "id=" + $(this).data("id"),
            dataType: "text",
            complete: function (response, status) {
                onInvoiceDeleteComplete(response.responseText, status);
            }
        });
});

function onInvoiceDeleteComplete(response, status) {
    if (status == "success") {
        var resultSet = JSON.parse(response);
        if (resultSet.status.trim() == "success") {
            $("#alertSuccess").text("Successfully deleted.");
            $("#alertSuccess").show();
            $("#divInvoiceGrid").html(resultSet.data);
        } else if (resultSet.status.trim() == "error") {
            $("#alertError").text(resultSet.data);
            $("#alertError").show();
        }
    } else if (status == "error") {
        $("#alertError").text("Error while deleting.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error while deleting..");
        $("#alertError").show();
    }
}
//CLIENT-MODEL================================================================
function validateInvoiceForm() {
    // AMOUNT
    if ($("#amount").val().trim() == "") {
        return "Insert invoice amount.";
    }
    
    // is numerical value
    var invoiceamnt = $("#amount").val().trim();
    if (!$.isNumeric(invoiceamnt)) {
        return "Insert a numerical value for invoice amount.";
    }
    // convert to decimal price
    $("#amount").val(parseFloat(invoiceamnt).toFixed(2));
    
    // RID
    if ($("#research_id").val().trim() == "") {
        return "Insert research ID.";
    }
    
    // DATE------------------------
    if ($("#date").val().trim() == "") {
        return "Insert a correct date !!!";
    }
    
    // CID
    if ($("#cus_id").val().trim() == "") {
        return "Insert customer ID.";
    }
    return true;
}