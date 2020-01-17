<%@ page import="java.time.Year" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>License Usage API</title>
    <link rel="icon" href="/licenseserver/images/favicon.ico" type="image/x-icon">
    <style type="text/css">
        html, body {
            margin: 0;
            height: 100%;
            line-height: 1.4em;
            overflow: hidden;
            font-family: Arial, Verdana, sans-serif;
        }

        pre {
            line-height: normal;
        }

        .container {
            height: 100%;
        }

        .logo-header {
            height: 25px;
            background-color: #333333;
        }

        .parasoft-logo {
            width: 92px;
            height: 15px;
            margin: 5px 10px;
            display: inline-block;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url(data:image/png;base64,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);
        }

        .title-header {
            height: 35px;
            background-color: #004877;
        }

        .app-title {
            color: #fff;
            font-size: 18px;
            line-height: 35px;
            margin-left: 20px;
            vertical-align: middle;
        }

        .content {
            overflow-y: auto;
            height: calc(100% - 75px);
        }

        .apidoc {
            margin: auto;
            max-width: 960px;
            min-width: 500px;
        }

        .api-endpoint {
            margin-bottom: 25px;
        }

        .api-title {
            margin: 30px 0;
            font-size: 24px;
            font-weight: bold;
        }

        .endpoint-section {
            margin-bottom: 25px;
        }

        .api-endpoint .endpoint-section:last-child {
            margin-bottom: 0;
        }

        .endpoint-title {
            border: 1px solid #c3d9ec;
            background-color: #e7f0f7;
        }

        .endpoint-method {
            color: white;
            width: 50px;
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
            text-align: center;
            padding: 7px 0 4px 0;
            display: inline-block;
            vertical-align: middle;
            text-decoration: none;
            background-color: #0f6ab4;
            border-radius: 2px;
            -o-border-radius: 2px;
            -ms-border-radius: 2px;
            -moz-border-radius: 2px;
            -webkit-border-radius: 2px;
            -khtml-border-radius: 2px;
        }

        .endpoint-path {
            color: black;
            font-size: 16px;
            margin-left: 10px;
            vertical-align: middle;
        }

        .endpoint-info {
            padding: 20px;
            border: 1px solid #c3d9ec;
            border-top-width: 0;
            background-color: #e7f0f7;
        }

        .section-title {
            color: #0f6ab4;
            margin-bottom: 5px;
        }

        .endpoint-description {

        }

        .example-response {
            margin: 0;
            padding: 10px;
            border: 1px solid #e5e0c6;
            background-color: #fcf6db;
        }

        .footer {
            color: #fff;
            height: 15px;
            font-size: 10px;
            line-height: 15px;
            text-align: center;
            vertical-align: middle;
            background-color: #333333;
        }
    </style>
</head>
<body>
<div class="container">

    <!-- HEADER -->
    <div class="header">
        <div class="logo-header">
            <div class="parasoft-logo" draggable="false" ondragstart="return false; // Firefox"></div>
        </div>
        <div class="title-header">
            <span class="app-title">License Server</span>
        </div>
    </div>

    <!-- CONTENT -->
    <div class="content">
        <div class="apidoc">

            <div class="api-title">License Usage API v1.0</div>

            <p>This API uses the stored access logs to provide information about the licenses served by
                this instance of License Server. By default, logs are stored for the last 90 days.
                To change how long logs are stored, configure "Log cleaning" in
                <a href="/licenseserver/jsp/grs_log_config.jsp">License Server configuration</a>.</p>

            <p>Warning: The combined size of the log files stored may affect performance.
                Calling an API endpoint may take several minutes if several gigabytes of log
                files are stored. Use the startDate and endDate query parameters to analyze
                portions of the logs to improve performance.</p>

            <h2>Concepts</h2>

            <p>The following terms are used in this API.</p>

            <h3 id="concept-user">User</h3>
            <p>A user is defined as the combination of
                a user name and a host name.  User "jane" on host "server1" and "jane" on "server2"
                are considered two distinct users.</p>

            <h3 id="concept-license">License</h3>
            <p>A license is defined as the combination of tool, version, and <a href="#concept-user">user</a>.</p>

            <h2>API Endpoints</h2>


            <!-- TOOLS USAGE API -->
            <div class="api-endpoint">
                <div class="endpoint-title">
                    <span class="endpoint-method">GET</span>
                    <a class="endpoint-path" target="_blank" href="/licenseserver/usage/api/v1.0/toolsUsage">/toolsUsage</a>
                </div>
                <div class="endpoint-info">
                    <div class="endpoint-section">
                        <div class="section-title">Description</div>
                        <div class="endpoint-description">
                            <p>This endpoint returns a summary of license usage for each tool.</p>
                            <p>The summary is a list of tools with the following fields for each tool:</p>
                            <ul>
                                <li>tool: The tool name.</li>
                                <li>maxConcurrentLicenseCount: The maximum number of <a href="#concept-license">licenses</a>
                                    used for this tool at any point in time.</li>
                                <li>maxConcurrentLicenseTime: The most recent time at which maxConcurrentLicenseCount occurred.</li>
                                <li>featuresAtMaxConcurrentLicenseTime: The features in use at maxConcurrentLicenseTime.</li>
                                <li>uniqueHostCount: The number of unique host names across the entire time period.</li>
                                <li>uniqueUserCount: The number of unique <a href="#concept-user">users</a> across the entire time period.</li>
                                <li>usageHours: The amount of time licenses were used.  For example, if "john" on "machine1" used a license
                                    for 2 hours and "jane" on "machine2" used a license for 3 hours (and those were the only two users),
                                    then "usageHours" is 5.</li>
                            </ul>

                            <p>Query parameters:</p>
                            <ul>
                                <li>startDate: Inclusive, format yyyy-MM-dd.  Optional.</li>
                                <li>endDate: Exclusive, format yyyy-MM-dd.  Optional.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="endpoint-section">
                        <div class="section-title">Example Response</div>
                        <pre class="example-response">[
  {
    "maxConcurrentLicenseCount": 31,
    "maxConcurrentLicenseTime": "2018-07-19T13:58:49.778",
    "tool": "jtest!",
    "uniqueHostCount": 55,
    "uniqueUserCount": 55,
    "usageHours": 2953.0889869444445,
    "featuresAtMaxConcurrentLicenseTime": [
      {
        "count": 18,
        "feature": "Automation"
      },
      {
        "count": 1,
        "feature": "BugDetective"
      },
      {
        "count": 8,
        "feature": "Change Based Testing"
      }
    ]
  },
  {
    "maxConcurrentLicenseCount": 29,
    "maxConcurrentLicenseTime": "2018-07-25T09:49:11.590",
    "tool": "SOAtest",
    "uniqueHostCount": 73,
    "uniqueUserCount": 74,
    "usageHours": 2437.6806444444446,
    "featuresAtMaxConcurrentLicenseTime": [
      {
        "count": 24,
        "feature": "Command Line"
      },
      {
        "count": 29,
        "feature": "SOA"
      }
    ]
  }
]</pre>
                    </div>
                </div>
            </div>


            <!-- FEATURES BY TOOL USAGE API -->
            <div class="api-endpoint">
                <div class="endpoint-title">
                    <span class="endpoint-method">GET</span>
                    <a class="endpoint-path" target="_blank" href="/licenseserver/usage/api/v1.0/featuresUsage">/featuresUsage</a>
                </div>
                <div class="endpoint-info">
                    <div class="endpoint-section">
                        <div class="section-title">Description</div>
                        <div class="endpoint-description">
                            <p>This endpoint returns a list of features grouped by tool that have been used at least once.</p>
                            <p>Query parameters:</p>
                            <ul>
                                <li>startDate: Inclusive, format yyyy-MM-dd.  Optional.</li>
                                <li>endDate: Exclusive, format yyyy-MM-dd.  Optional.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="endpoint-section">
                        <div class="section-title">Example Response</div>
                        <pre class="example-response">[
  {
    "tool": "jtest!",
    "features": [
      "Automation",
      "BugDetective",
      "Change Based Testing",
      "Code Review",
      "Coding Standards",
      "Command Line Mode",
      "Coverage",
      "DTP Publish",
      "Desktop Command Line",
      "Flow Analysis",
      "RuleWizard",
      "Runtime Error Detection",
      "Security",
      "Tracer",
      "Unit Test",
      "Unit Test Bulk Creation",
      "Unit Test Spring Framework",
      "Unit Testing"
    ]
  },
  {
    "tool": "SOAtest",
    "features": [
      "Advanced Test Generation 100 Users",
      "Command Line",
      "Jtest Connect",
      "Message Packs",
      "RuleWizard",
      "SOA",
      "Server API Enabled",
      "Stub Desktop",
      "Stub Server",
      "Web"
    ]
  }
]</pre>
                    </div>
                </div>
            </div>

            <div class="api-endpoint">
                <div class="endpoint-title">
                    <span class="endpoint-method">GET</span>
                    <a class="endpoint-path" target="_blank" href="/licenseserver/usage/api/v1.0/licenseUsage">/licenseUsage</a>
                </div>
                <div class="endpoint-info">
                    <div class="endpoint-section">
                        <div class="section-title">Description</div>
                        <div class="endpoint-description">
                            <p>This endpoint returns a list of <a href="#concept-license">licenses</a> used.
                                For each license, this endpoint returns the duration of usage and the features used.
                                If a <a href="#concept-user">user</a> gets a license at 09:00 for one hour, releases the license, and then borrows
                                it again at 11:30 for one hour, that counts as a single license, with a usage time of 2 hours.</p>
                            <p>Query parameters:</p>
                            <ul>
                                <li>startDate: Inclusive, format yyyy-MM-dd.  Optional.</li>
                                <li>endDate: Exclusive, format yyyy-MM-dd.  Optional.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="endpoint-section">
                        <div class="section-title">Example Response</div>
                        <pre class="example-response">[
  {
    "tool": "jtest!",
    "toolVersion": "10.4",
    "usageHours": 1.8499186111111112,
    "user": {
      "hostName": "machine1",
      "name": "user1"
    },
    "features": [
      "Automation",
      "Change Based Testing",
      "Coding Standards",
      "Coverage",
      "DTP Publish",
      "Desktop Command Line",
      "Flow Analysis",
      "Unit Test",
      "Unit Test Bulk Creation",
      "Unit Test Spring Framework"
    ]
  },
  {
    "tool": "SOAtest",
    "toolVersion": "9.10",
    "usageHours": 97.91826666666667,
    "user": {
      "hostName": "machine1",
      "name": "user1"
    },
    "features": [
      "Advanced Test Generation 100 Users",
      "Command Line",
      "Jtest Connect",
      "Message Packs",
      "RuleWizard",
      "SOA",
      "Server API Enabled",
      "Stub Desktop",
      "Stub Server",
      "Web"
    ]
  }
]</pre>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
        <span class="copyright">Copyright &copy; 1996-<%=Year.now().toString()%>.</span>
    </div>

</div>
<script type="application/javascript">
    (function() {
        var today = new Date().toISOString().substring(0, 10);
        var paths = document.getElementsByClassName('endpoint-path');
        for (var i = 0; i < paths.length; i++) {
            paths[i].href += '?startDate=' + today;
        }
    })();
</script>
</body>
</html>
