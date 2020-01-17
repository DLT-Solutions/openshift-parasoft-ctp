<%@ page isErrorPage="true" %>
<%@ page import="com.parasoft.ls.main.engine.ILicenseServerConstants" %>

<jsp:useBean id="busy" class="com.parasoft.ls.webapps.beans.BusyPageBean"/>

<%
 
 boolean bIsStarted = busy.isLicenseServerStarted();
 if (bIsStarted) {
     busy.logException(exception);
 }

 String sTitle = "License Server";

%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>

<TABLE cellspacing="5" cellpadding="0" border="0">
<% if (!bIsStarted) { 
       String sStopStatusMsg = busy.getStatusMessage();
       int errorCode = busy.getErrorCode();
%>
<TR><TD class="label">License Server is not running.</TD></TR> 

<%-- Instance lock failed  --%>
<% if (errorCode == ILicenseServerConstants.INSTANCE_LOCK_FAILED) { %>
<TR><TD height="20"></TD></TR>
<TR><TD>Reason: There is another License Server running on this machine.</TD></TR>
<TR><TD>If there is no another License Server running,
wait 1 minute and run License Server once more.</TD></TR>

<%-- Can't listen on selected port  --%>
<% } else if (errorCode == ILicenseServerConstants.PORT_ALREADY_TAKEN) {%>
<TR><TD height="20"></TD></TR>
<TR><TD>Reason: License Server cannot start listen on selected port.</TD></TR>
<TR><TD>Please change License Server port or make current one available, then run License Server once more.</TD></TR>

<%-- Too many license servers in subnet --%>
<% } else if (errorCode == ILicenseServerConstants.TOO_MANY_LICENSE_SERVERS_IN_SUBNET) {%>
<TR><TD height="20"></TD></TR>
<TR><TD>Reason: There is too many License Servers running in the subnet.</TD></TR>
<% if ((sStopStatusMsg != null) && (sStopStatusMsg.trim().length() > 0)) { %>
<TR><TD>License Servers detected: <%=sStopStatusMsg %></TD></TR>
<% } %>
<TR><TD>Please shut down other License Servers or change license.</TD></TR>

<%-- All other problems with stopped server --%>
<% } else { %>
<%   if (sStopStatusMsg != null) { %>
<TR><TD height="20"></TD></TR>
<TR><TD>Reason: <%=sStopStatusMsg%></TD></TR>
<%   } %>
<% } %>
<TR><TD height="10"></TD></TR>
<TR><TD><A href="javascript:document.rform.submit()">[Restart License Server]</A></TD></TR>

<%-- Handle jsp page exceptions here --%>
<% } else { %>
<TR><TD class="label">There was problem processing your request. Please try again or contact License Server administrator.</TD></TR>
<TR><TD><%=busy.getExceptionMessage()%></TD></TR> 
<TR><TD height="5"></TD></TR>
<TR><TD><A href="javascript:history.back()">[Back]</A></TD></TR>
<% } %>
</TABLE>
<FORM method="POST" action="/licenseserver/jsp/home.jsp" name="rform">
  <INPUT type="HIDDEN" name="restartLS" value="1">
</FORM>
<jsp:include page="footer.jsp" flush="true"/>
