<jsp:root xmlns:c="http://java.sun.com/jsp/jstl/core"
	xmlns:fn="http://java.sun.com/jsp/jstl/functions"
	xmlns:spring="http://www.springframework.org/tags"
	xmlns:form="http://www.springframework.org/tags/form"
	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0">

	<jsp:output omit-xml-declaration="yes" />

	<jsp:directive.attribute name="id" type="java.lang.String" required="true" rtexprvalue="true"
		description="The identifier for this tag (do not change!)" />
	<jsp:directive.attribute name="field" type="java.lang.String" required="true" rtexprvalue="true"
		description="The field exposed from the form backing object" />
	<jsp:directive.attribute name="cssClass" type="java.lang.String" required="false" rtexprvalue="true" />
	<jsp:directive.attribute name="rows" type="java.lang.Integer" required="false" rtexprvalue="true" />
	<jsp:directive.attribute name="required" type="java.lang.Boolean" required="false" rtexprvalue="true"
		description="Indicates if this field is required (default false)" />
	<jsp:directive.attribute name="disabled" type="java.lang.Boolean" required="false" rtexprvalue="true"
		description="Specify if this field should be enabled" />
	<jsp:directive.attribute name="render" type="java.lang.Boolean" required="false" rtexprvalue="true"
		description="Indicate if the contents of this tag and all enclosed tags should be rendered (default 'true')" />

	<c:if test="${empty render or render}">

		<c:if test="${empty disabled}">
			<c:set value="false" var="disabled" />
		</c:if>

		<c:if test="${empty required}">
			<c:set value="false" var="required" />
		</c:if>

		<c:set var="sec_field">
			<spring:escapeBody javaScriptEscape="true">${field}</spring:escapeBody>
		</c:set>

		<c:choose>
			<c:when test="${required}">
				<form:textarea id="_${id}_id" path="${sec_field}" disabled="${disabled}" required="true" cssClass="${cssClass}" rows="${rows}"/>
			</c:when>
			<c:otherwise>
				<form:textarea id="_${id}_id" path="${sec_field}" disabled="${disabled}" cssClass="${cssClass}" rows="${rows}"/>
			</c:otherwise>
		</c:choose>

		<form:errors cssClass="errors" id="_${id}_error_id" path="${sec_field}" />

	</c:if>
</jsp:root>