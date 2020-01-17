<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.UpdateToolsDatabaseBean" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="update" class="com.parasoft.ls.webapps.beans.admin.UpdateToolsDatabaseBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>

<%
	LicenseServerContext context = new LicenseServerContext(request, response);
caller.init(context);
String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");

try {
    update.updateLicenses(context);
} catch (Throwable t) {
    t.printStackTrace();
}
boolean bIsError = update.isError();
boolean bUpdated = update.isUpdated();
String sError = update.getErrorMessage();
String sRemoteUrl = update.getRemoteUpdateUrl();

String sTitle = "Tools database update";
//caller.init(context);
//String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>

<SCRIPT language="JavaScript">
  function radioChanged()
  {
      if (document.updateForm.<%=UpdateToolsDatabaseBean.PARAMETER_NAME_ACTION%>[0].checked) {
          document.updateForm.<%=UpdateToolsDatabaseBean.PARAMETER_NAME_FILE%>.disabled = true;
      } else if (document.updateForm.<%=UpdateToolsDatabaseBean.PARAMETER_NAME_ACTION%>[1].checked) {
          document.updateForm.<%=UpdateToolsDatabaseBean.PARAMETER_NAME_FILE%>.disabled = false;
      }
  }
</SCRIPT> 

<FORM name="updateForm" method="POST" action="updateToolsDatabase.jsp" enctype="multipart/form-data" class="content">
<TABLE>
  <TR><TD class="label">Tools database update</TD></TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
  <%
  	if (bIsError) {
  %>
  <TR><TD height="30"></TD></TR>
  <TR><TD class="warning_10"><%=sError%></TD></TR>
  <%
  	}
  %>
  <%
  	if (bUpdated) {
  %>
  <TR><TD height="30"></TD></TR>
  <TR><TD class="blue_text">Tools database updated.</TD></TR>
  <%
  	} else {
  %>
  <TR><TD height="30"></TD></TR>
  <TR><TD>Select update type:</TD></TR>
  <TR><TD><INPUT type="radio" name="<%=UpdateToolsDatabaseBean.PARAMETER_NAME_ACTION%>" checked
    value="<%=UpdateToolsDatabaseBean.ACTION_DOWNLOAD%>" onChange="radioChanged()">Update from remote server (<%=sRemoteUrl%>)</TD></TR>
  <TR><TD><INPUT type="radio" name="<%=UpdateToolsDatabaseBean.PARAMETER_NAME_ACTION%>" 
    value="<%=UpdateToolsDatabaseBean.ACTION_UPLOAD%>" onChange="radioChanged()">Update from file: <INPUT type="file" 
    name="<%=UpdateToolsDatabaseBean.PARAMETER_NAME_FILE%>" value="" disabled></TD></TR>
  <TR><TD height="30"></TD></TR>
  <TR><TD><A href="javascript:document.updateForm.submit()">[Update]</A></TD></TR>
  <% } %>
</TABLE>
</FORM>

<jsp:include page="footer.jsp" flush="true"/>
