<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.common.IWebConstants" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="tools" class="com.parasoft.ls.webapps.beans.admin.ToolsDatabaseBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>

<%
	LicenseServerContext context = new LicenseServerContext(request, response);

tools.init(context);
String[] asToolNames = tools.getToolNames();

String sTitle = "Tools database";
String sCaller = caller.getCaller(context);
caller.init(context);
String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>

<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR><TD><h1>Tools database</h1></TD></TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
  <TR><TD height="30"></TD></TR>
  <TR><TD><A href="updateToolsDatabase.jsp?<%=IWebConstants.CALLER_PARAMETER_NAME%>=<%=java.net.URLEncoder.encode(sCaller)%>">[Update Tools Database]</A></TD></TR>
  <TR><TD height="30"></TD></TR>
  <TR><TD>
        <UL class="list">
      <% for (int i = 0; i < asToolNames.length; i++) {
          String sToolName = asToolNames[i]; 
          String [] asVersion = tools.getToolVersions(sToolName);
          if ((asVersion != null) && (asVersion.length > 0)) {  %>

        <LI><%=sToolName%>&nbsp;&nbsp;&nbsp;
          <% for (int t = 0; t < asVersion.length; t++) {
               if (t > 0) {
                  %>,&nbsp;&nbsp;<%
               }
          %><%=asVersion[t]%><% 
             } 
        %></LI>
      <%   }

         }%>
      </UL>
  </TD></TR>
</TABLE>

<jsp:include page="footer.jsp" flush="true"/>
