<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ page import="org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter"%>
<%@ page import="org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter"%>
<%@ page import="org.springframework.security.core.AuthenticationException"%>
<jsp:useBean id="navigation" class="com.parasoft.ls.webapps.beans.NavigationBean"/>
<%String sCSSContextPath = navigation.getCssContextPath();%>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="<%=sCSSContextPath%>/login/login.css" />
    <link rel="stylesheet" type="text/css" href="<%=sCSSContextPath%>/buttons.css" />

    <script type="text/javascript">
  function setFocus()
  {
      document.getElementById("loginInput").focus();
  }
  </script>
</head>

<body onload="setFocus()">
<%
	String sLogin = (String)session.getAttribute(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_LAST_USERNAME_KEY);

%>
<form action="<c:url value='pst_login_request'/>" method="POST">
<table height="90%" align="center">
	<tr>
		<td height="90%">
			<table class="login-page" align="center" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td align="center">
						<table class="login">
							<tr>
								<td align="center" valign="bottom" colspan="2">
									<c:choose>
								        <c:when test="${not empty param.login_error}"> 
											&nbsp;
											<font class="label" style="color: red;">Your login attempt was not successful, try again.</font>
								        </c:when>
								        <c:otherwise>
								        	&nbsp;
								        	<font class="label">Authorization required, please login.</font>
								        </c:otherwise>
							        </c:choose>
								</td>	
							</tr>						
							<tr>
						        <td class="label">User:</td>
						        <td>
						        <c:choose>
							        <c:when test="${not empty param.login_error}"> 
										<input class="loginInput" type='text' name='j_username' value='<%=sLogin%>' id='loginInput'/>        
							        </c:when>
							        <c:otherwise>
							        	<input class="loginInput" type='text' name='j_username' id='loginInput'/>
							        </c:otherwise>
						        </c:choose>
						        </td>
						    </tr>
						    <tr>
						        <td class="label">Password:</td>
						        <td><input class="loginInput" type='password' name='j_password'></td>
						    </tr>
						    <tr align="center">
						    	<td colspan="2" class="label" style="text-align: center;"><input type="checkbox" name="_remember_me">Auto login</td>
						    </tr> 
						    <tr align="center">
								<c:choose>
									<c:when test="${param.login_error == 2}"> <!-- LDAP enabled -->
								        <td colspan='0'>
								        	<input name="login" type="submit" class="button" value="Log in">
								        </td>
								        <td colspan='0'>
								        	<a href="/pstsec/jsf/ldapSynchronizer.jsf?login=<%=sLogin%>" title="Synchronize with LDAP">Synchronize Me</a>
								        </td>		        
									</c:when>
									<c:otherwise>
										<td colspan='2'>
											<input name="login" type="submit" class="button" value="Log in"/>
										</td>
									</c:otherwise>
								</c:choose>
						    </tr>
						</table>
					</td>
				</tr>
			    <tr>
			    	<td class="copyrights">
			    		Copyright (c) 1996-2008 Parasoft
			    	</td>
			    </tr>				
			</table>
		</td>
	</tr>
</table>
</form>
</body>
</html>
