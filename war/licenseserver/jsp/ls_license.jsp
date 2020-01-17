<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.parasoft.ls.webapps.beans.CallerBean"%>
<jsp:useBean id="status" class="com.parasoft.ls.webapps.beans.LSStatusBean"/>
<%
    status.init(request);
    String sReturnUrl = status.getLicenseConfigurationUrl();
    if (sReturnUrl != null) {
        response.sendRedirect(response.encodeRedirectURL(sReturnUrl));
        return;
    }
%>
License configuration url is not available... please try go back and click at Parasoft logo (top, left corner of the page). 