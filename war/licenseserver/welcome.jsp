<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ page import="org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter"%>
<%@ page import="com.parasoft.pst.common.resources.ConcertoResourcer" %>
<%@ page pageEncoding="UTF-8"%>
<jsp:useBean id="bean" scope="request" class="com.parasoft.pst.core.web.beans.WelcomeBean">
    <jsp:setProperty name="bean" property="*"/>
</jsp:useBean>

<jsp:useBean id="registerUserBean" scope="request" class="com.parasoft.pst.core.web.beans.RegisterUserBean">
    <jsp:setProperty name="registerUserBean" property="*"/> 
</jsp:useBean>

<%
    bean.init(request, response);
%>

<html>
    <%@ include file="head_content_login.jspi"%>
<body onload="setFocus()">
    <script type="text/javascript">
	    function setFocus()
	    {
	        var errorMessage = document.getElementById("errorMessage");
	        var loginInput = document.getElementById("loginInput");
	        var passwordInput = document.getElementById("passwordInput");
	        if (errorMessage) {
	        	passwordInput.focus();
	        } else {
	        	loginInput.focus();
	        }
	    }    
    </script>

    <div class="welcomePage brand-primary">
   		<div><%@ include file="login.jspi"%></div>
    </div>

</body>
</html>