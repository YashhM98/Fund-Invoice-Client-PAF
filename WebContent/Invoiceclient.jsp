<%@ page import="com.invoiceclient.Invoice"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Invoice Management</title>
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/Invoice.js"></script>
<link rel="stylesheet" href="Views/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col">


<h1>Invoice Management</h1>
<form class="needs-validation" novalidate id="invoiceform">
 <input type='hidden' id='hiddenIDSave2' name='hiddenIDSave2' value=''>
  <div class="form-group row">
    <label for="amount" class="col-sm-2 col-form-label">Invoice Amount</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="amount" name="amount">
    </div>
  </div>
  <div class="form-group row">
    <label for="research_id" class="col-sm-2 col-form-label">Research ID</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="research_id" name="research_id">
    </div>
  </div>
  <div class="form-group row">
    <label for="date" class="col-sm-2 col-form-label">Invoice date</label>
    <div class="col-sm-10">
      <input type="date" class="form-control" id="date" name="date">
    </div>
  </div>
  <div class="form-group row">
    <label for="cus_id" class="col-sm-2 col-form-label">Customer ID</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="cus_id" name="cus_id">
    </div>
  </div>
   <div class="form-group row">
    <div class="col-sm-10">
      <button type="button" class="btn btn-primary" id="saveinvoice">Save</button>
    </div>
  </div>
</form>

				<br>

				<div id='alertSuccess' name='alertSuccess' class='alert alert-success'></div>
				<div id='alertError' name='alertError' class='alert alert-danger'></div>

				<br>
				<div id="divInvoiceGrid">
				<%
				Invoice invoiceObject = new Invoice();
				out.print(invoiceObject.readinvoice());
				%>
				</div>

			</div>
		</div>
	</div>

</body>
</html>