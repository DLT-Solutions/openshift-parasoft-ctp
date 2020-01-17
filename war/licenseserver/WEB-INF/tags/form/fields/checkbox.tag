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
	<jsp:directive.attribute name="required" type="java.lang.Boolean" required="false" rtexprvalue="true"
		description="Indicates if this field is required (default false)" />
	<jsp:directive.attribute name="disableFormBinding" type="java.lang.Boolean" required="false" rtexprvalue="true"
		description="Set to true to disable Spring form binding" />
	<jsp:directive.attribute name="render" type="java.lang.Boolean" required="false" rtexprvalue="true"
		description="Indicate if the contents of this tag and all enclosed tags should be rendered (default 'true')" />

	<c:if test="${empty render or render}">

		<c:if test="${empty required}">
			<c:set value="false" var="required" />
		</c:if>

		<c:set var="sec_field">
			<spring:escapeBody javaScriptEscape="true">${field}</spring:escapeBody>
		</c:set>

		<c:choose>
			<c:when test="${disableFormBinding}">
				<input id="_${id}_id" name="${sec_field}" type="checkbox" />
			</c:when>
			<c:otherwise>
				<c:choose>
					<c:when test="${required}">
						<form:checkbox id="_${id}_id" path="${sec_field}" required="true" />
					</c:when>
					<c:otherwise>
						<form:checkbox id="_${id}_id" path="${sec_field}" />
					</c:otherwise>
				</c:choose>

			</c:otherwise>
		</c:choose>

	</c:if>
</jsp:root>