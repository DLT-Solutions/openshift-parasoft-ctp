<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.CommonOptionBean" %>
<%@ page import="toolkit.util.web.HTMLConvert" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="options" class="com.parasoft.ls.webapps.beans.admin.CommonOptionBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>

<%
 LicenseServerContext context = new LicenseServerContext(request, response);

 caller.init(context);
 String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");

 options.init(context);
 
 String sTitle = "Service options";
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>
<SCRIPT language="JavaScript">

function addOption()
{
    document.optionForm.<%=CommonOptionBean.PARAM_ACTION%>.value = "<%=CommonOptionBean.ACTION_ADD_OPTION%>";
       
    document.optionForm.submit();
}

function removeOption(sOptionData)
{
    if (confirm("Removing option, are you sure ?")) {
        document.optionForm.<%=CommonOptionBean.PARAM_ACTION%>.value = "<%=CommonOptionBean.ACTION_REMOVE_OPTION%>";
        document.optionForm.<%=CommonOptionBean.PARAM_OPTION_DATA%>.value = sOptionData;
     
        document.optionForm.submit();
    }
}

</SCRIPT>
<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR>
    <TD><h1>Service options</h1></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
  <TR><TD height="20"></TD></TR>
</TABLE>
<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR><TD>Machine&nbsp;ID:&nbsp;<%=options.getArch()%>-<%=options.getMachineId()%></TD></TR>
</TABLE>



<% if (options.isError()) { %>
<DIV class="warning_10"><%=options.getErrorMessage()%></DIV>
<% } %>

<FORM name="optionForm" action="common_options.jsp" method="post">
<TABLE cellspacing="0" cellpadding="2" border="0" class="content">
  <TR><TD class="label">Add option:&nbsp;&nbsp;&nbsp;&nbsp;</TD></TR>
  <TR><TD>Option: <INPUT type="text" size="130" name="<%=CommonOptionBean.PARAM_OPTION_DATA%>" value=""></TD></TR>
  <TR><TD><A href="javascript:addOption()">[Add]</A></TD></TR>
</TABLE>
<INPUT type="hidden" name="<%=CommonOptionBean.PARAM_ACTION%>" value="">
</FORM>


<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
<tr><td><B>Applied options:</B></td></tr>
<tr><td>
<TABLE cellspacing="0" cellpadding="2" border="0">
<%  for (int idx = 0; idx < options.getSize(); idx++) { %>
    <TR><TD><LI></TD><TD <%if(!options.isDateValid(idx)){%>class="text_red"<%}%>><%=options.getName(idx)%><%if(!options.isDateUnlimited(idx)) {%>, valid <%=options.getDateLabel(idx)%><%}%> <A href="javascript:removeOption('<%=options.getData(idx)%>')">[Remove]</A></TD></TR>
    <%if(options.hasInfo(idx)) {%>
    <TR><TD></TD><TD class="size_10"><%=options.getInfo(idx)%></TD></TR>
    <%}%> 
<%  } %>
</TABLE>
</td></tr>
<jsp:include page="footer.jsp" flush="true"/>
 
