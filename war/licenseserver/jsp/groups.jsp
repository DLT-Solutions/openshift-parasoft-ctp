<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.PatternGroupsBean" %>
<%@ page import="com.parasoft.ls.webapps.common.IWebConstants" %>
<%@ page import="toolkit.util.web.HTMLConvert" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="groups" class="com.parasoft.ls.webapps.beans.admin.PatternGroupsBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>

<%
	LicenseServerContext context = new LicenseServerContext(request, response);
 
 caller.init(context);
 String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");
 
 groups.init(context);
 String[] asGroupNames = groups.getGroupNames();
 int[] aGroupSizes = groups.getGroupSizes();
 int[] aGroupSizesGroups = groups.getGroupSizesGroups();
 String sNewGroupName = groups.getNewGroupName();

 String sTitle = "Pattern groups";
 
 String[] asIgnoredParams = { PatternGroupsBean.PARAM_PATTERN_GROUP_NAME, PatternGroupsBean.PARAM_ACTION };
 String sCaller = caller.getCaller(context, asIgnoredParams);
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>
<SCRIPT language="JavaScript">
 function remove(groupName) 
 {
 }
 function addGroup() 
 {
     document.mtForm.<%=PatternGroupsBean.PARAM_ACTION%>.value = "<%=PatternGroupsBean.ADD_ACTION%>";
     document.mtForm.submit();
 }
 
 function removeGroup(groupName) 
 {
     if (confirm("Removing group: "+groupName+", are you sure ?")) {
	     document.mtForm.<%=PatternGroupsBean.PARAM_ACTION%>.value = "<%=PatternGroupsBean.REMOVE_ACTION%>";
	     document.mtForm.<%=PatternGroupsBean.PARAM_PATTERN_GROUP_NAME%>.value = groupName;
	     document.mtForm.submit();
	 }
 }
 
</SCRIPT>
<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR>
    <TD><h1>Pattern groups</h1></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
  <TR><TD height="20"></TD></TR>
</TABLE>
<FORM name="mtForm" action="groups.jsp" method="post">
<TABLE cellspacing="0" cellpadding="2" border="0" class="content">
  <TR>
    <TD class="label">New pattern group:</TD>
    <TD><INPUT type="text" name="<%=PatternGroupsBean.PARAM_PATTERN_GROUP_NAME%>" value="<%=HTMLConvert.toHTML(sNewGroupName, false)%>">
      <A href="javascript:addGroup()">[Add]</A></TD>
  </TR>
  <%
  	if (groups.hasErrors(PatternGroupsBean.PARAM_PATTERN_GROUP_NAME)) { 
           String[] asErrors = groups.getErrors(PatternGroupsBean.PARAM_PATTERN_GROUP_NAME);
  %>
  <TR>
    <TD></TD>
    <TD class="warning_10">
<%
	for (int i = 0; i < asErrors.length; i++) {
%><%=asErrors[i]%><BR>
<%
	}
%>
    </TD>
  </TR>
  <%
  	}
  %>
</TABLE>
<TABLE cellspacing="0" cellpadding="2" border="0" class="content">
  <TR><TD colspan="2" height="15"></TD></TR>
  <TR><TD colspan="2"><B>Existing groups:</B></TD></TR>
  <TR><TD colspan="2" height="10"></TD></TR>
  <%
  	if (groups.hasErrors(PatternGroupsBean.REMOVE_ACTION)) {
  %>
  <TR><TD class="warning_10" colspan="2">
<%
	String[] asErrors = groups.getErrors(PatternGroupsBean.REMOVE_ACTION);
       for (int i = 0; i < asErrors.length; i++) {
%>
       <%=HTMLConvert.toHTML(asErrors[i], false)%><BR>
  <%
  	}
  %>
  </TD></TR>
<%
	}
%>
  <TR><TD height="15" colspan="2"></TD></TR>
  <%
  	if ((asGroupNames == null) || (asGroupNames.length == 0)) {
  %>
  <TR><TD colspan="2">No groups defined.</TD></TR>
<%
	} else {
       for (int i = 0; i < asGroupNames.length; i++) {
%>
  <TR>
    <TD width="200">-&nbsp;<B><%=HTMLConvert.toHTML(asGroupNames[i], false)%></B> (p:<%=aGroupSizes[i]%>, g:<%=aGroupSizesGroups[i]%>)</TD>
    <TD>
      <A href="group.jsp?<%=IWebConstants.CALLER_PARAMETER_NAME%>=<%=java.net.URLEncoder.encode(sCaller)%>&<%=PatternGroupsBean.PARAM_PATTERN_GROUP_NAME%>=<%=java.net.URLEncoder.encode(asGroupNames[i])%>">[Edit]</A>&nbsp;&nbsp;
      <A href="javascript:removeGroup('<%=asGroupNames[i]%>');">[Remove]</A></TD>
  </TR>
  <%
  	}
       }
  %>
</TABLE>
<INPUT type="hidden" name="<%=PatternGroupsBean.PARAM_ACTION%>" value=""> 
</FORM>
<jsp:include page="footer.jsp" flush="true"/>
 
