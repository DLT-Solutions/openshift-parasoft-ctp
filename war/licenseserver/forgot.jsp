<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ page import="com.parasoft.pst.core.web.beans.JspBean.Message" %>
<%@ page import="com.parasoft.pst.common.resources.ConcertoResourcer" %>
<%@ page import="org.apache.commons.lang.StringEscapeUtils" %>
<%@ page import="java.text.MessageFormat" %>

<jsp:useBean id="bean" scope="request" class="com.parasoft.pst.core.web.beans.ForgotPasswordBean">
    <jsp:setProperty name="bean" property="*"/> 
</jsp:useBean>

<%
    bean.init(request, response);
    
    bean.processRequest();
%>
<html>
    <%@ include file="head_content_login.jspi"%>
<body>
	<div class="welcomePage brand-primary">
        <div class="container loginPanel">
			<div class="parasoftLogo marginBottom"></div>
			<form method="post">
				<div class="form-group">
					<%if (bean.getMessage() != null) {%>
			            <label class="${(bean.message.severity == 1) ? 'text-danger' : 'text-success'}">${bean.message.value}</label>
		            <%} else { %>
		               	<label class="control-label"><%= ConcertoResourcer.getString("LOGIN_PROBLEMS") %></label>
		            <%} %>
	            </div>
	            <div class="form-group">
	               	<%if (bean.getMessage() == null) {%>
	               		<p><%= ConcertoResourcer.getString("LOGIN_FORGOT_INFO") %></p>
	               	<%} %>
	            </div>
	                
	            <%if (bean.getMessage() == null || bean.getMessage().getSeverity() == 1) {%>
	        	   	<div class="form-group">
	            		<label class="control-label"><%= ConcertoResourcer.getString("FORGOT_EMAIL_LABEL") %>:</label>
	            		<%if (bean.getEmail() != null && !bean.getEmail().isEmpty()) {%>
	               			<input class="form-control" type="text" name="email" value="<%=StringEscapeUtils.escapeXml(bean.getEmail())%>"/>
	               		<%} else {%>
	               			<input class="form-control" type="text" name="email" value=""/>
	               		<%}%>
	                </div>	
	                <div class="form-group">
	               		<a class="btn btn-primary btn-lg backButton" href="welcome.jsp#login" role="button"><%= ConcertoResourcer.getString("BACK_BUTTON") %></a>
	                	<input type="submit" class="btn btn-primary btn-lg loginButton" value="<%= ConcertoResourcer.getString("FORGOT_SUBMIT_BUTTON") %>"/>
	                </div>
	            <%} else {%>
	               	<div class="form-group">
	               		<a class="btn btn-primary btn-lg loginButton" href="welcome.jsp#login" role="button"><%= ConcertoResourcer.getString("CONFIRM_CONTINUE_BUTTON") %></a>
	               	</div>
	            <%} %>
	            </div>
			</form>
		</div>
	</div>
</body>

</html>
