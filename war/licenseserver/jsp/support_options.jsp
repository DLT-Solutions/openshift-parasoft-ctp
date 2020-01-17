<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.beans.admin.SupportOptionBean" %>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="soBean" class="com.parasoft.ls.webapps.beans.admin.SupportOptionBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>

<%
	LicenseServerContext context = new LicenseServerContext(request, response);
 soBean.init(context);
 caller.init(context);
 String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");
 
// boolean bProcessed = soBean.optionProcessed();
 
 String sTitle = "Support options";
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>

<SCRIPT language="JavaScript">

function processOption()
{ 
    document.soForm.<%=SupportOptionBean.PARAM_ACTION%>.value="<%=SupportOptionBean.ACTION_APPLY%>";
    document.soForm.submit();
}

</SCRIPT>

<FORM name="soForm" action="support_options.jsp" method="POST">
  <INPUT type="hidden" name="<%=SupportOptionBean.PARAM_ACTION%>" value=""></INPUT>
<TABLE  border="0" cellspacing="0" cellpadding="0">
  <TR>
    <TD><B>Support Options</B></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
  <TR><TD height="10"></TD></TR>
  <%
  	if (soBean.isMessage()) {
  %>
  	  <TR><TD><FONT color="goldenrod"><%=soBean.getMessage()%></FONT></TD></TR>
  <%
  	}
  %>
</TABLE>
<TABLE border="0">
  <TR>
    <TD colspan="2"><TEXTAREA name="<%=SupportOptionBean.SUPPORT_OPTION_ENTRY%>" cols="80" rows="4" wrap="OFF"></TEXTAREA></TD>
  </TR>
  <% if (soBean.isError()) { %>
  <TR><TD colspan="2" height="10" class="warning_10"><%=soBean.getError()%></TD></TR>
  <% } %>
  <TR><TD colspan="2" height="10"></TD></TR>
  <TR><TD colspan="2"><A href="javascript:processOption()">[apply]</A></TD></TR>
  <TR><TD colspan="2" height="40"></TD></TR>
</TABLE>
</FORM>

<jsp:include page="footer.jsp" flush="true"/>

    
    