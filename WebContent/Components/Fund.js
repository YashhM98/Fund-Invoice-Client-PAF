$(document).ready(function () {
    if ($("#alertSuccess").text().trim() == "") {
        $("#alertSuccess").hide();
    }
    $("#alertError").hide();
});




$(document).on("click", "#savefund", function (event) {
    // Clear alerts---------------------
    $("#alertSuccess").text("");
    $("#alertSuccess").hide();
    $("#alertError").text("");
    $("#alertError").hide();
    // Form validation-------------------
    var status = validateFundForm();
    if (status != true) {
        $("#alertError").text(status);
        $("#alertError").show();
        return;
    }
    // If valid------------------------
    var type = ($("#hiddenIDSave").val() == "") ? "POST" : "PUT";
    $.ajax(
        {
            url: "FundClientAPI",
            type: type,
            data: $("#fundform").serialize(),
            dataType: "text",
            complete: function (response, status) {
                onFundSaveComplete(response.responseText, status);
            }
        });
});

function onFundSaveComplete(response, status) {
    if (status == "success") {
        var resultSet = JSON.parse(response);
        if (resultSet.status.trim() == "success") {
            $("#alertSuccess").text("Successfully saved.");
            $("#alertSuccess").show();
            $("#divFundGrid").html(resultSet.data);
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
    $("#hiddenIDSave").val("");
    $("#fundform")[0].reset();
}

$(document).on("click", ".btnUpdate", function (event) {
    $("#hiddenIDSave").val($(this).data("id"));
    $("#sponsor_nic").val($(this).closest("tr").find('td:eq(1)').text());
    $("#research_id").val($(this).closest("tr").find('td:eq(2)').text());
    $("#f_amount").val($(this).closest("tr").find('td:eq(3)').text());
    $("#sponsor").val($(this).closest("tr").find('td:eq(4)').text());
    $("#f_date").val($(this).closest("tr").find('td:eq(5)').text());
});

$(document).on("click", ".btnRemove", function (event) {
    $.ajax(
        {
            url: "FundClientAPI",
            type: "DELETE",
            data: "id=" + $(this).data("id"),
            dataType: "text",
            complete: function (response, status) {
                onFundDeleteComplete(response.responseText, status);
            }
        });
});

function onFundDeleteComplete(response, status) {
    if (status == "success") {
        var resultSet = JSON.parse(response);
        if (resultSet.status.trim() == "success") {
            $("#alertSuccess").text("Successfully deleted.");
            $("#alertSuccess").show();
            $("#divFundGrid").html(resultSet.data);
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
function validateFundForm() {
    // NIC
    if ($("#sponsor_nic").val().trim() == "") {
        return "Insert sponsor NIC.";
    }
    // RID
    if ($("#research_id").val().trim() == "") {
        return "Insert research ID.";
    }
    // AMOUNT-------------------------------
    if ($("#f_amount").val().trim() == "") {
        return "Insert fund amount.";
    }
    // is numerical value
    var fundamnt = $("#f_amount").val().trim();
    if (!$.isNumeric(fundamnt)) {
        return "Insert a numerical value for fund amount.";
    }
    // convert to decimal price
    $("#f_amount").val(parseFloat(fundamnt).toFixed(2));
    
    // SPONSOR------------------------
    if ($("#sponsor").val().trim() == "") {
        return "Insert sponsor.";
    }
    
    // DATE------------------------
    if ($("#f_date").val().trim() == "") {
        return "Insert a correct date !!!";
    }
    return true;
}