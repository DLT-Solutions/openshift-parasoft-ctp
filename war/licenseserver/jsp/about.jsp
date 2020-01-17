<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.common.Version"%>

<%
  String sTitle = "About";
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>

<TABLE border="0" cellspacing="0" cellpadding="0" class="content">
  <TR height="40"><TD><h1>About License Server Standalone</h1></TD></TR>
</TABLE>

<TABLE border="0" cellspacing="10" cellpadding="0" class="content">
  <TR>
  	<TD>Version:</TD>
  	<TD><h3><%=Version.getVersion()%></h3></TD>
  </TR>
  <TR>
  	<TD>Build Id:</TD>
  	<TD><h3><%=Version.getBuildId()%></h3></TD>
  </TR>
</TABLE>

<jsp:include page="footer.jsp" flush="true"/>