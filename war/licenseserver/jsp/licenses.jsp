<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.beans.IBeanConstants"%>
<%@ page import="com.parasoft.ls.webapps.beans.admin.LicensesManagementBean"%>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext"%>
<%@ page import="com.parasoft.ls.webapps.common.IWebConstants"%>
<%@ page errorPage="busy.jsp"%>

<jsp:useBean id="licensesView" class="com.parasoft.ls.webapps.beans.admin.LicensesManagementViewBean" />
<jsp:useBean id="licensesManagement" class="com.parasoft.ls.webapps.beans.admin.LicensesManagementBean" />
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean" />

<%
	LicenseServerContext context = new LicenseServerContext(request, response);

	licensesManagement.init(context); // need to be before view - action on licenses set
	licensesView.init(context);

	String sAction = licensesManagement.getAction();

	String sTitle = "Installed Tool Licenses List";
	caller.init(context);
	String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");
	String[] asParamsToExclude = { LicensesManagementBean.PARAM_ACTION,	LicensesManagementBean.PARAM_LICENSE_ID };
	String sCaller = caller.getCaller(context, asParamsToExclude);

	String[] asStandardKeys = licensesView.getStandardKeys();
	String[] asUpgradeUnlinkedKeys = licensesView.getUpgradeUnlinkedKeys();
%>

<jsp:include page="header.jsp" flush="true">
	<jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>

<SCRIPT language="JavaScript">
function removeLicenseByKey(sLicenseKey, toolName)
{
  if (confirm("Remove license for " + toolName + "?")) {
    document.licenses_management_form.<%=LicensesManagementBean.PARAM_LICENSE_ID%>.value = sLicenseKey;
    document.licenses_management_form.<%=LicensesManagementBean.PARAM_ACTION%>.value = "<%=LicensesManagementBean.ACTION_REMOVE_LICENSE%>";
    document.licenses_management_form.submit();
  }
}

function view(licKey)
{
  document.view_license.<%=IBeanConstants.PARAM_LICENSE_ID%>.value=licKey;
  document.view_license.submit();
}

function linkUpgradeLicense(sLicenseKey)
{
    document.link_upgrade_license_form.<%=LicensesManagementBean.PARAM_LICENSE_ID%>.value = sLicenseKey;
    document.link_upgrade_license_form.submit();
}

</SCRIPT>

<FORM name="view_license" method="POST" action="license.jsp">
    <INPUT type="hidden" name="<%=IBeanConstants.PARAM_LICENSE_ID%>" value="">
    <INPUT type="hidden" name="<%=IWebConstants.CALLER_PARAMETER_NAME%>" value="<%=sCaller%>">
</FORM>

<FORM name="licenses_management_form" method="POST"	action="licenses.jsp">
    <INPUT type="hidden" name="<%=LicensesManagementBean.PARAM_LICENSE_ID%>" value="">
    <INPUT type="hidden" name="<%=LicensesManagementBean.PARAM_ACTION%>" value="">
</FORM>

<FORM name="link_upgrade_license_form" method="POST"	action="link_upgrade_license.jsp">
    <INPUT type="hidden" name="<%=LicensesManagementBean.PARAM_LICENSE_ID%>" value="">
</FORM>

<!-- FORM action="licenses.jsp" method="POST" name="licenses_form"-->
<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
	<TR><TD><h1>Installed Tool Licenses List</h1></TD></TR>
	<TR><TD height="5"></TD></TR>
	<TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
	<TR><TD height="30"></TD></TR>
	<%
		if (LicensesManagementBean.ACTION_REMOVE_LICENSE.equals(sAction)) {
			if (licensesManagement.getResult()) {
	%>
	<TR>
		<TD class="blue_text">Succesfully removed license: <%=licensesManagement.getLicenseName()%>.</TD>
	</TR>
	  <%} else {%>
	<TR>
		<TD class="warning_12">Can't remove license: <%=licensesManagement.getLicenseName()%>.</TD>
	</TR>
	  <%}%>
	<TR>
		<TD height="30"></TD>
	</TR>
  <%}%>
</TABLE>

<%
if (asStandardKeys.length > 0) {
%>
<TABLE cellspacing="0" cellpadding="4" border="1" class="content">
	<TR>
		<TD>&nbsp;</TD>
		<TD class="header">Tool name</TD>
		<TD class="header">Machine ID</TD>
		<TD class="header">Expiration date</TD>
		<TD class="header">Installed tokens</TD>
		<TD class="header">Status</TD>
		<TD>&nbsp;</TD>
	</TR>
	<%
	for (int i = 0; i < asStandardKeys.length; i++) {
		String sLicenseKey = asStandardKeys[i];
		String sExpDateStyle = licensesView.getExpirationDateStyle(sLicenseKey);
		int iSize = licensesView.getSize(sLicenseKey);
		boolean bDateValid = licensesView.isDateInRange(sLicenseKey);
		boolean isMachineIdValid = licensesView.isLicenseMachineIdValid(sLicenseKey);
	%>
	<TR>
		<TD><%=i + 1%></TD>
		<TD><A href="javascript:view('<%=sLicenseKey%>')"><%=licensesView.getToolName(sLicenseKey)%>&nbsp;<%=licensesView.getVersion(sLicenseKey)%></A></TD>
		<TD><%=licensesView.getArchName(sLicenseKey)%>-<%=licensesView.getMachineIdHex(sLicenseKey)%></TD>
		<TD class="level_<%=sExpDateStyle%> %>"><%=licensesView.getExpirationDate(sLicenseKey)%></TD>
		<TD>
		<%
		 if (licensesView.getSize(sLicenseKey) == 0) {
		%>Unlimited<%
		 } else {
		%><%=licensesView.getSize(sLicenseKey)%>
		<%}%>
		</TD>
		<td><%if (isMachineIdValid) {%>VALID<%} else { %><span class="level_alert" title="Invalid License: The machine ID in the license does not match the machine ID of this License Server">INVALID</span><%} %></td>
		<TD><A href="javascript:removeLicenseByKey('<%=sLicenseKey%>', '<%=licensesView.getToolName(sLicenseKey)%>')">[Remove]</A></TD>
	</TR>
	<%
		if (licensesView.hasLinkedKeys(sLicenseKey)) {
			String[] asLinkedKeys = licensesView.getLinkedKeys(sLicenseKey);
			for (int j = 0; j < asLinkedKeys.length; j++) {
				String sLinkedLicenseKey = asLinkedKeys[j];
				String sLinkedExpDateStyle = licensesView.getExpirationDateStyle(sLinkedLicenseKey);
	
				int iLinkedSize = licensesView.getSize(sLinkedLicenseKey);
				String sLinkedSize = "" + iLinkedSize;
				if (iLinkedSize == 0) {
					sLinkedSize = "Unlimited";
				}
				if (!bDateValid) {
					sLinkedSize = "0 (" + sLinkedSize + ")";
				} else if (iSize != 0 && iSize < iLinkedSize) {
					sLinkedSize = "" + iSize + " (" + sLinkedSize + ")";
				}
	%>
	<TR>
		<TD>&nbsp;</TD>
		<TD>
		-&nbsp;<A href="javascript:view('<%=sLinkedLicenseKey%>')"><%=licensesView.getToolName(sLinkedLicenseKey)%>&nbsp;<%=licensesView.getVersion(sLinkedLicenseKey)%></A>
		</TD>
		<TD><%=licensesView.getArchName(sLinkedLicenseKey)%>-<%=licensesView.getMachineIdHex(sLinkedLicenseKey)%></TD>
		<TD class="level_<%=sLinkedExpDateStyle%> %>"><%=licensesView.getExpirationDate(sLinkedLicenseKey)%></TD>
		<TD><%=sLinkedSize%></TD>
		<TD>
		    <A href="javascript:removeLicenseByKey('<%=sLinkedLicenseKey%>', '<%=licensesView.getToolName(sLicenseKey)%>')">[Remove]</A>
		</TD>
	</TR>

	      <%}
		}
	}%>
</TABLE>
<%}%> 
<% if (asUpgradeUnlinkedKeys.length > 0) { %>

<P class="warning_12">Not linked upgrade licenses:</P>
<TABLE cellspacing="0" cellpadding="4" border="1" class="content">
	<TR>
		<TD>&nbsp;</TD>
		<TD class="header">Tool name</TD>
		<TD class="header">Machine ID</TD>
		<TD class="header">Expiration date</TD>
		<TD class="header">Installed tokens</TD>
		<TD class="header">Status</TD>
		<TD>&nbsp;</TD>
	</TR>
	<%
		for (int i = 0; i < asUpgradeUnlinkedKeys.length; i++) {
			String sLicenseKey = asUpgradeUnlinkedKeys[i];
			String sExpDateStyle = licensesView.getExpirationDateStyle(sLicenseKey);
			boolean isMachineIdValid = licensesView.isLicenseMachineIdValid(sLicenseKey);
	%>
	<TR>
		<TD><%=i + 1%></TD>
		<TD><A href="javascript:view('<%=sLicenseKey%>')"><%=licensesView.getToolName(sLicenseKey)%>&nbsp;<%=licensesView.getVersion(sLicenseKey)%></A></TD>
		<TD><%=licensesView.getArchName(sLicenseKey)%>-<%=licensesView.getMachineIdHex(sLicenseKey)%></TD>
		<TD class="level_<%=sExpDateStyle%> %>"><%=licensesView.getExpirationDate(sLicenseKey)%></TD>
		<TD>
		<%
		if (licensesView.getSize(sLicenseKey) == 0) {
		%>Unlimited<%
		} else {
		%><%=licensesView.getSize(sLicenseKey)%>
		<%
		}
		%>
		</TD>
		<td><%if (isMachineIdValid) {%>VALID<%} else { %><span class="level_alert" title="Invalid License: The machine ID in the license does not match the machine ID of this License Server">INVALID</span><%} %></td>
		<TD>
		    <A href="javascript:linkUpgradeLicense('<%=sLicenseKey%>', '<%=licensesView.getToolName(sLicenseKey)%>')">[Link to]</A>&nbsp;
		    <A href="javascript:removeLicenseByKey('<%=sLicenseKey%>', '<%=licensesView.getToolName(sLicenseKey)%>')">[Remove]</A>
		</TD>
	</TR>
	<%
	}
	%>
</TABLE>
<%
}
%> <jsp:include page="footer.jsp" flush="true" />
