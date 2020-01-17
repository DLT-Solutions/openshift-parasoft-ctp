<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.LogViewBean" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>
<jsp:useBean id="log" class="com.parasoft.ls.webapps.beans.admin.LogViewBean"/>


<%
	LicenseServerContext context = new LicenseServerContext(request, response);

String sCaller = caller.getCaller(context);
caller.init(context);
String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");

log.viewLog(context);

String sLogFile = log.getLogFile();
String sFilter = log.getFilter();
String sErrorMessage = log.getErrorMessage();
boolean bUseFilter = log.getUseFilter();


String sTitle = "Log file";
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>
<SCRIPT language="JavaScript">
  function reload()
  {
      document.view_log_form.submit();
  }
</SCRIPT>
<TABLE  border="0" cellspacing="0" cellpadding="0" class="content">
  <TR>
    <TD><h1>Log file: <%=sLogFile%></h1></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
  <TR><TD height="20"></TD></TR>
</TABLE>

<FORM name="view_log_form" action="view_log.jsp" method="get">
  <TABLE class="content">
    <TR>
      <TD>
       <INPUT type="checkbox" name="<%=LogViewBean.USE_FILTER_PARAM_NAME%>" value="1" 
        <%if (bUseFilter) {%>CHECKED<%}%>>&nbsp;Use filter&nbsp;
       <INPUT type="text" name="<%=LogViewBean.FILTER_REGEXP_PARAM_NAME%>" value="<%=sFilter%>" 
        size="60" maxlength="400">&nbsp;(regexp pattern)
       <INPUT type="hidden" name="<%=LogViewBean.LOG_FILE_PARAM_NAME%>" value="<%=sLogFile%>">
      </TD>
    <TR>
    <TR><TD><A href="javascript:reload()">[Refresh view]</A></TD></TR>
    <% if (sErrorMessage != null) { %>
    <TR><TD class="warning_10"><%=sErrorMessage%></TD></TR>
    <% } %>
  </TABLE>
</FORM>


<%--SPAN style="white-space:nowrap"><TT><%=sLine %></TT></SPAN><BR--%>
<A style="padding-left: 10px;" NAME="topAnchor" HREF="#bottomAnchor">[Bottom]</A>
<PRE class="logs">
<% 
   // Warning! Be carefull during changing placement inside pre tag! 
   // New lines are matter!
   String sLine = log.getNextLine();
   while (sLine != null) { %><%=sLine%>
<%
      sLine = log.getNextLine();
   } 
   log.cleanUp();
   %>
</PRE>
<A style="padding-left: 10px;" NAME="bottomAnchor" HREF="#topPageAnchor">[Top]</A>
<jsp:include page="footer.jsp" flush="true"/>
