<%@ page import="com.fundclient.Fund"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Fund Management</title>
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/Fund.js"></script>
<link rel="stylesheet" href="Views/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col">
					<h2>Fund Management</h2>
						<hr>
						<form class="needs-validation" novalidate id="fundform">
						 <input type='hidden' id='hiddenIDSave' name='hiddenIDSave' value=''>
						  <div class="form-group row">
						    <label for="sponsor_nic" class="col-sm-2 col-form-label">Sponsor NIC</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="sponsor_nic" name="sponsor_nic">
						    </div>
						  </div>
						  <div class="form-group row">
						    <label for="research_id" class="col-sm-2 col-form-label">Research ID</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="research_id" name="research_id">
						    </div>
						  </div>
						  <div class="form-group row">
						    <label for="f_amount" class="col-sm-2 col-form-label">Fund amount</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="f_amount" name="f_amount">
						    </div>
						  </div>
						  <div class="form-group row">
						    <label for="sponsor" class="col-sm-2 col-form-label">Sponsor</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control" id="sponsor" name="sponsor">
						    </div>
						  </div>
						  <div class="form-group row">
						    <label for="f_date" class="col-sm-2 col-form-label">Fund date</label>
						    <div class="col-sm-10">
						      <input type="date" class="form-control" id="f_date" name="f_date">
						    </div>
						  </div>
					  <div class="form-group row">
					    <div class="col-sm-10">
					      <button type="button" class="btn btn-primary" id="savefund">Save</button>
					    </div>
					  </div>
					</form>	

				<br>
				<div id='alertSuccess' name='alertSuccess' class='alert alert-success'></div>
				<div id='alertError' name='alertError' class='alert alert-danger'></div>
				<br>
				<div id="divFundGrid">
				<%
				Fund fundObject = new Fund();
				out.print(fundObject.readfunds());
				%>
				</div>
			</div>
		</div>
	</div>
</body>
</html>