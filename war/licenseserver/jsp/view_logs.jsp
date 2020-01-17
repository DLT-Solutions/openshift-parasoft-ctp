<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.LogViewBean" %>
<%@ page import="com.parasoft.ls.webapps.common.IWebConstants" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>
<jsp:useBean id="logs" class="com.parasoft.ls.webapps.beans.admin.LogsViewBean"/>


<%
	LicenseServerContext context = new LicenseServerContext(request, response);

String sCaller = caller.getCaller(context);
caller.init(context);
String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");

logs.listLogFiles(context);

String[] asLogNames = logs.getlogFileNames();
int[] aLogSizes = logs.getLogFileSizes();

String sTitle = "Log files list";
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>
<SCRIPT language="JavaScript">
  function viewLog(logName)
  {
      document.view_log_form.<%=LogViewBean.LOG_FILE_PARAM_NAME%>.value=logName;
      document.view_log_form.submit();
  }
</SCRIPT>
<TABLE  border="0" cellspacing="0" cellpadding="0" class="content">
  <TR>
    <TD><h1>Log files list</h1></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
</TABLE>
<TABLE cellspacing="5" cellpadding="0" border="0" class="content">
<TR><TD colspan="3" height="15"></TD></TR>
<TR>
  <TD></TD>
  <TD>File name</TD>
  <TD>File size [kB]</TD>
</TR>
<%
	for (int i = 0; i < asLogNames.length; i++) {
%>
<TR>
  <TD><A href="javascript:viewLog('<%=asLogNames[i]%>')">[View]</A>&nbsp;</TD>
  <TD><%=asLogNames[i]%>&nbsp;&nbsp;</TD>
  <TD><%=aLogSizes[i]%></TD>
</TR>
<%
	}
%>
</TABLE>
<FORM name="view_log_form" method="post" action="view_log.jsp">
  <INPUT type="hidden" name="<%=LogViewBean.LOG_FILE_PARAM_NAME%>" value="">
  <INPUT type="hidden" name="<%=IWebConstants.CALLER_PARAMETER_NAME%>" value="<%=sCaller %>">
</FORM>
<jsp:include page="footer.jsp" flush="true"/>
