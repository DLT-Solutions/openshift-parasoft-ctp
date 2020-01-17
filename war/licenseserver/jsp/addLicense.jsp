<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.beans.admin.AddLicenseBean" %>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="addBean" class="com.parasoft.ls.webapps.beans.admin.AddLicenseBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>

<%
	LicenseServerContext context = new LicenseServerContext(request, response);
 addBean.init(context);
 caller.init(context);
 String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");
 
 String[] asToolNames = addBean.getToolNames();
 int[] aToolIds = addBean.getToolIds();
 int selectedTool = addBean.getSelectedTool();
 String[] asArchNames = addBean.getArchNames();
 int[] aArchIds = addBean.getArchIds();
 int _selectedArchitecture = addBean.getSelectedArchitecture();
 String[] asVersions = addBean.getVersions();
 String _sSelectedVersion = addBean.getSelectedVersion();
 System.err.println("Selected: " + selectedTool);
 String sTitle = "Add license";
 String sMachineId = addBean.getMachineId();
 String sArchitecture = addBean.getArchitecture();
 String sFullLicenseEntry = addBean.getFullLicenseEntry();
 
String sExpirationTime = addBean.getExpirationTime();
String sPassword = addBean.getPassword();
 
boolean bAdded = addBean.licenseAdded();
String [] asAddedLicenseName = addBean.getAddedLicenseNames();
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>

<SCRIPT language="JavaScript">
function addLicense1()
{ 
    document.licForm.<%=AddLicenseBean.PARAM_ACTION%>.value="<%=AddLicenseBean.ACTION_ADD%>";
    document.licForm.submit();
}

function addLicense2()
{ 
    document.licForm.<%=AddLicenseBean.PARAM_ACTION%>.value="<%=AddLicenseBean.ACTION_ADD_FULL%>";
    document.licForm.submit();
}

function changeTool()
{
    document.licForm.<%=AddLicenseBean.PARAM_ACTION%>.value="";
    document.licForm.submit();
}
</SCRIPT>

<FORM name="licForm" action="addLicense.jsp" method="POST">
<INPUT type="hidden" name="<%=AddLicenseBean.PARAM_LAST_TOOL_ID%>" value="<%=selectedTool%>">
<INPUT type="hidden" name="<%=AddLicenseBean.PARAM_ACTION%>" value="">
<TABLE  border="0" cellspacing="0" cellpadding="0" class="content">
  <TR>
    <TD><h1>Add New License</h1></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
</TABLE>
<TABLE border="0" cellspacing="0" cellpadding="4" class="content">
  <TR><TD colspan="2" height="15"></TD></TR>
  <TR><TD colspan="2">Machine ID: <%=sArchitecture%>-<%=sMachineId%></TD></TR>
  <TR><TD colspan="2" height="15"></TD></TR>
  <%
  	if (bAdded) {
           for (int idx = 0; idx < asAddedLicenseName.length; idx++) {
  %>
	  <TR><TD colspan="2"><FONT color="goldenrod">New license for <%=asAddedLicenseName[idx]%> added.</FONT></TD></TR>
      <%
      	}
      %>
  <TR><TD colspan="2" height="15"></TD></TR>
  <%
  	}
  %>
  <TR>
    <TD colspan="2">Fill out license parameters</TD>
  </TR>
  <TR><TD colspan="2" height="15"></TD></TR>
  <TR>
    <TD align="right">Tool:</TD>
    <TD>
      <SELECT name="<%=AddLicenseBean.PARAM_TOOL_ID%>" onChange="changeTool()" style="width: 182">
        <OPTION value="-1">Select a Tool</OPTION>
        <%
        	for (int i = 0; i < aToolIds.length; i++) {
        %>
        <OPTION value="<%=aToolIds[i]%>" <%if (selectedTool == aToolIds[i]) {%>SELECTED<%}%>><%=asToolNames[i]%></OPTION>
        <%
        	}
        %>
      </SELECT>
    </TD>
  </TR>
  <%
  	if (addBean.hasErrors(AddLicenseBean.PARAM_TOOL_ID)) {
  %>
  <TR><TD></TD><TD height="10" class="warning_10"><%=addBean.getErrors(AddLicenseBean.PARAM_TOOL_ID)%></TD></TR>
  <%
  	}
  %>
  <TR>
    <TD align="right">Version:</TD>
    <TD>
      <SELECT name="<%=AddLicenseBean.PARAM_VERSION%>" style="width: 182">
        <OPTION value="-1">Select a version</OPTION>
        <%
        	for (int i = 0; i < asVersions.length; i++) {
        %>
        <OPTION value="<%=asVersions[i]%>" <%if (asVersions[i].equals(_sSelectedVersion)) {%>SELECTED<%}%>><%=asVersions[i]%></OPTION>
        <%
        	}
        %>
      </SELECT>
    </TD>
  </TR>
  <%
  	if (addBean.hasErrors(AddLicenseBean.PARAM_VERSION)) {
  %>
  <TR><TD></TD><TD height="10" class="warning_10"><%=addBean.getErrors(AddLicenseBean.PARAM_VERSION)%></TD></TR>
  <%
  	}
  %>
  <TR>
    <TD align="right">Architecture:</TD>
    <TD>
      <SELECT name="<%=AddLicenseBean.PARAM_ARCH%>" style="width: 182">
        <OPTION value="-1">Select tool arch</OPTION>
        <%
        	for (int i = 0; i < aArchIds.length; i++) {
        %>
        <OPTION value="<%=aArchIds[i]%>" <%if (_selectedArchitecture == aArchIds[i]) {%>SELECTED<%}%>><%=asArchNames[i]%></OPTION>
        <%
        	}
        %>
      </SELECT>
    </TD>
  </TR>
  <%
  	if (addBean.hasErrors(AddLicenseBean.PARAM_ARCH)) {
  %>
  <TR><TD></TD><TD height="10" class="warning_10"><%=addBean.getErrors(AddLicenseBean.PARAM_ARCH)%></TD></TR>
  <%
  	}
  %>
  <TR>
    <TD align="right">Expiration date:</TD>
    <TD><INPUT type="text" name="<%=AddLicenseBean.PARAM_EXP_DATE%>" value="<%=sExpirationTime%>" maxlength="10" size="15"></TD>
  </TR>
  <%
  	if (addBean.hasErrors(AddLicenseBean.PARAM_EXP_DATE)) {
  %>
  <TR><TD></TD><TD height="10" class="warning_10"><%=addBean.getErrors(AddLicenseBean.PARAM_EXP_DATE)%></TD></TR>
  <%
  	}
  %>
  <TR>
    <TD align="right">Password:</TD>
    <TD><INPUT type="text" name="<%=AddLicenseBean.PARAM_PASSWORD%>" value="<%=sPassword%>" size="45"></TD>
  </TR>
  <%
  	if (addBean.hasErrors(AddLicenseBean.PARAM_PASSWORD)) {
  %>
  <TR><TD></TD><TD height="10" class="warning_10"><%=addBean.getErrors(AddLicenseBean.PARAM_PASSWORD)%></TD></TR>
  <%
  	}
  %>
  <%
  	if (addBean.hasErrors(AddLicenseBean.ACTION_ADD)) {
  %>
  <TR><TD colspan="2" height="10" class="warning_10"><%=addBean.getErrors(AddLicenseBean.ACTION_ADD)%></TD></TR>
  <%
  	}
  %>
  <TR><TD colspan="2"><A href="javascript:addLicense1()">[Add license]</A></TD></TR>
  <TR><TD colspan="2" height="30"></TD></TR>
  <TR><TD colspan="2">Or cut and paste license password lines here as they were sent to you :<BR>
        (example : `Insure++.password 5.1 SOL-80c0a8b6 6488360 41ae382464146e88')</TD></TR>
  <TR>
    <TD colspan="2"><TEXTAREA name="<%=AddLicenseBean.PARAM_LICENSE_ENTRY%>" cols="80" rows="8" wrap="OFF"><%=sFullLicenseEntry%></TEXTAREA></TD>
  </TR>
  <%
  	if (addBean.hasErrors(AddLicenseBean.ACTION_ADD_FULL)) {
  %>
  <TR><TD colspan="2" height="10" class="warning_10"><%=addBean.getErrors(AddLicenseBean.ACTION_ADD_FULL)%></TD></TR>
  <% } %>
  <TR><TD colspan="2" height="10"></TD></TR>
  <TR><TD colspan="2"><A href="javascript:addLicense2()">[Add license]</A></TD></TR>
  <TR><TD colspan="2" height="40"></TD></TR>
</TABLE>
</FORM>

<jsp:include page="footer.jsp" flush="true"/>

    
    
