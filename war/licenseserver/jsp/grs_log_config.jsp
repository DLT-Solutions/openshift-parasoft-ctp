<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.beans.admin.LogConfigBean" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.ServerConfigBean" %>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="logBean" class="com.parasoft.ls.webapps.beans.admin.LogConfigBean"/>
<jsp:useBean id="serverBean" class="com.parasoft.ls.webapps.beans.admin.ServerConfigBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>

<%
 LicenseServerContext context = new LicenseServerContext(request, response);
 caller.init(context);
 String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");
 logBean.init(context);
 serverBean.init(context);
 
 boolean bUseCustomLog = logBean.isUseCustomLogLocation();
 boolean bLogCleaningEnabled = logBean.isLogCleaningEnabled();
 
 int logCleaningRangeDays = logBean.getLogCleaningRangeDays();
 String sCustomLogLocation = logBean.getCustomLogLocation();  
 String sDefaultLogLocation = logBean.getDefaultLogLocation();
 
 int lsPort = serverBean.getPort();
 boolean bStartDeactivated = serverBean.getStartDeactivated();
 int lsConcurrentConnections = serverBean.getConcurrentConnectionsLimit();
 
 String sTitle = "License Server configuration";
%>
 
<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>
 
<SCRIPT language="JavaScript">
  function saveChanges() {
      document.logConfigForm.<%=LogConfigBean.TODO_PARAM_NAME%>.value="<%=LogConfigBean.SAVE_ACTION%>";
      document.logConfigForm.submit();
  }
  
  function updateLogCleaning()
  {
      logCleaningEnabled = document.logConfigForm.<%=LogConfigBean.LOG_CLEANING_ENABLED_PARAM_NAME%>.checked;
      document.logConfigForm.<%=LogConfigBean.LOG_CLEANING_RANGE_DAYS_PARAM_NAME%>.disabled = !logCleaningEnabled;
  }
  
  function updateLocation()
  {
      customLocation = document.logConfigForm.<%=LogConfigBean.CUSTOM_LOG_TYPE_PARAM_NAME%>[1].checked;
      document.logConfigForm.<%=LogConfigBean.CUSTOM_LOG_PATH_PARAM_NAME%>.disabled = !customLocation;
  }
  
  function restartServer()
  {
      document.logConfigForm.<%=LogConfigBean.TODO_PARAM_NAME%>.value="<%=ServerConfigBean.RESTART_ACTION%>";
      document.logConfigForm.submit();
  }
</SCRIPT>
<TABLE  border="0" cellspacing="0" cellpadding="0" class="content">
  <TR>
    <TD><h1>License Server configuration</h1></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
</TABLE>
<FORM name="logConfigForm" action="grs_log_config.jsp" method="POST">
<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR><TD height="15" colspan="2"></TD></TR>  
  <TR>
    <TD>License Server port:&nbsp;</TD>
    <TD>
        <INPUT type="text" name="<%=ServerConfigBean.PORT_PARAM_NAME%>" value="<%=lsPort %>" size="6" maxlength="5">&nbsp;
        <FONT COLOR="goldenrod">Note: Additional configuration changes are needed and a restart of the License Server are required when changing the port number, please see the documentation.</FONT>
    </TD>
  </TR>
  <TR><TD colspan="2" height="5"></TD></TR>
  <TR>
    <TD>Clients should start deactivated:&nbsp;</TD>
    <TD><INPUT type="checkbox" name="<%=ServerConfigBean.START_DEACTIVATED_PARAM_NAME%>" value="1" <% if (bStartDeactivated) { %>checked<% } %>></TD>
  </TR>
  <TR><TD colspan="2" height="5"></TD></TR>
  <TR>
    <TD>Concurrent connections limit:&nbsp;</TD>
    <TD><INPUT type="text" name="<%=ServerConfigBean.CONCURRENT_CONNECTIONS_LIMIT_PARAM_NAME%>" value="<%=lsConcurrentConnections%>" size="6" maxlength="5">
    </TD>
  </TR>
  <% if (serverBean.hasErrors()) { %>
  <TR><TD colspan="2" height="10"></TD></TR>
  <TR>
    <TD colspan="2" class="warning_10"><%=serverBean.getErrorMessage()%></TD>
  </TR>
  <% } %>
  
  <TR><TD colspan="2" height="15"></TD></TR>
  </TABLE>

  <HR>
  
  <TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR><TD colspan="3"><B>Access logs management</B></TD></TR>
  <TR><TD colspan="3" height="20"></TD></TR>
  <TR><TD><INPUT type="checkbox" name="<%=LogConfigBean.LOG_CLEANING_ENABLED_PARAM_NAME%>" 
          value="1" <% if (bLogCleaningEnabled) { %>checked<% } %> onClick="updateLogCleaning()"></TD>
      <TD colspan="2"> Log cleaning</TD>
  </TR>
  <TR><TD colspan="3" height="5"></TD></TR>
  <TR>
    <TD></TD>
    <TD colspan="2">Remove log files older than <INPUT type="text" name="<%=LogConfigBean.LOG_CLEANING_RANGE_DAYS_PARAM_NAME%>" 
        value="<%=logCleaningRangeDays%>" size="4" maxlength="3" <% if (!bLogCleaningEnabled) { %>disabled<% } %>> days.</TD>
  </TR>
  <% if (logBean.hasError(LogConfigBean.LOG_CLEANING_RANGE_DAYS_PARAM_NAME)) { %>
  <TR>
    <TD></TD>
    <TD colspan="2" class="warning_10"><%=logBean.getError(LogConfigBean.LOG_CLEANING_RANGE_DAYS_PARAM_NAME)%></TD>
  </TR>
  <% } %>

  <TR><TD colspan="3" height="30"></TD></TR>
  <TR><TD colspan="3">Use log files from location:</TD></TR>
  <TR><TD colspan="3" height="10"></TD></TR>
  <TR><TD></TD><TD colspan="2"><FONT COLOR="goldenrod">Note: It is not recommended to change the default path.</FONT></TD></TR>
  <TR>
    <TD></TD>
    <TD colspan="2"><INPUT type="radio" name="<%=LogConfigBean.CUSTOM_LOG_TYPE_PARAM_NAME%>" 
        value="<%=LogConfigBean.LOG_TYPE_DEFAULT%>" <% if (!bUseCustomLog) { %>CHECKED<% } %> onClick="updateLocation()">&nbsp;
        default (<%=sDefaultLogLocation%>)</TD>
  </TR>
  <TR><TD colspan="3" height="5"></TD></TR>
  <TR>
    <TD></TD>
    <TD colspan="2"><INPUT type="radio" name="<%=LogConfigBean.CUSTOM_LOG_TYPE_PARAM_NAME%>" 
        value="<%=LogConfigBean.LOG_TYPE_CUSTOM%>" <% if (bUseCustomLog) { %>CHECKED<% } %> onClick="updateLocation()">&nbsp;
        <INPUT type="text" name="<%=LogConfigBean.CUSTOM_LOG_PATH_PARAM_NAME %>" 
        value="<%=sCustomLogLocation%>" <% if (!bUseCustomLog) { %>disabled<% } %> size="35" maxlength="255">
    </TD>
  </TR>
  <% if (logBean.hasError(LogConfigBean.CUSTOM_LOG_PATH_PARAM_NAME)) { %>
  <TR>
    <TD></TD>
    <TD colspan="2" class="warning_10"><%=logBean.getError(LogConfigBean.CUSTOM_LOG_PATH_PARAM_NAME)%></TD>
  </TR>
  <% } %>
  <TR><TD colspan="3" height="15"></TD></TR>
  
  <TR><TD colspan="3"><A href="javascript:saveChanges()">[Save]</A></TD></TR>
</TABLE>
<INPUT type="hidden" name="<%=LogConfigBean.TODO_PARAM_NAME%>" value="">
</FORM>
<jsp:include page="footer.jsp" flush="true"/>
 