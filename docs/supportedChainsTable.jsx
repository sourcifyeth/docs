import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import ReactTooltip from "react-tooltip";
import LoadingOverlay from "../src/components/LoadingOverlay";

const Yes = () => <div className="centered-flex">✅</div>;
const No = () => <div className="centered-flex">❌</div>;
const C = ({ children }) => <div className="centered-flex">{children}</div>;
const R = ({ children }) => (
  <div style={{ textAlign: "right", fontFamily: "monospace" }}>{children}</div>
);

const TestResult = ({ result, detailedUrl, type, error }) => {
  const ToolTip = (
    <span>
      {`${type} contract verification for the chain failed`}
      <br />
      See{" "}
      <a target="_blank" rel="noreferrer" href={detailedUrl}>
        CI test run for details
      </a>
    </span>
  );
  if (error) {
    return (
      <div className="centered-flex" data-tip="Error gettings test results">
        ⚠️
      </div>
    );
  }
  if (result === true)
    return (
      <div
        className="centered-flex"
        data-tip={`${type} contract verification for the chain working`}
      >
        ✅
      </div>
    );
  if (result === false)
    return (
      <>
        <ReactTooltip
          effect="solid"
          delayHide={500}
          clickable={true}
          id="failed-test"
        />
        <div
          className="centered-flex"
          data-html={true}
          data-tip={renderToString(ToolTip)}
          data-for="failed-test"
        >
          ❌
        </div>
      </>
    );
  if (result === undefined)
    return (
      <div
        className="centered-flex"
        data-tip="No tests were given for this chain"
      >
        🤷
      </div>
    );
};

const Table = () => {
  const [sourcifyChains, setSourcifyChains] = useState();
  const [error, setError] = useState();
  const [testReportObject, setTestReportObject] = useState();
  const [testMap, setTestMap] = useState();
  const [testDate, setTestDate] = useState();

  const addMonitoredSupportFrom = async (url, supportedChains) => {
    try {
      // Try to fetch monitor information
      const req = await fetch(url)
      const res = await req.json()
      res.forEach(monitoredChain => {
        supportedChains.find(supportedChain => supportedChain.chainId === monitoredChain.chainId).monitored = true
      })
    } catch(e) {
      setError("Cannot get monitor data from url: " + url)
    }
  }

  useEffect(() => {
    fetch("https://sourcify.dev/server/chains")
      .then((res) => res.json())
      .then(async (chains) => {
        await addMonitoredSupportFrom('https://raw.githubusercontent.com/ethereum/sourcify/staging/services/monitor/chains.json', chains)
        setSourcifyChains(chains)
      })
      .catch((err) =>
        setError(
          "Error fetching chains from the Sourcify server\n\n" + err.message
        )
      );
    fetch("https://sourcify.dev/server/chain-tests")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Error fetching chain tests \n\n");
        }
        return response.json();
      })
      .then((json) => {
        console.log("Setting testmap");
        console.log(json);
        setTestDate(json.testReport.stats.end);
        const testMap = formatRawTestReport(json.testReport);
        console.log(testMap);
        setTestMap(testMap);
        setTestReportObject(json);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Takes the raw mochawesome test report .json and formats with the result of the standard and immutable contract verification for each chain.
  const formatRawTestReport = (rawReport) => {
    const testsArr = rawReport.results[0].suites[0].tests;
    const testMap = {};
    testsArr.forEach((test) => {
      const context = JSON.parse(test.context);
      if (!context) return;
      const chainId = context.value.chainId;
      console.log(chainId);
      const testType = context.value.testType; // either "normal" or "immutable"
      if (!testMap[chainId]) testMap[chainId] = {};
      testMap[chainId][testType] = test.pass;
    });
    return testMap;
  };

  if (!sourcifyChains) {
    return (
      <div style={{ margin: "8rem" }}>
        <LoadingOverlay message="Loading Sourcify chains" />
      </div>
    );
  }
  if ((!testMap || !testReportObject) && !error) {
    return (
      <div style={{ margin: "8rem" }}>
        <LoadingOverlay message="Loading chain verification tests" />
      </div>
    );
  }

  const testRunCircleURL =
    testReportObject &&
    `https://app.circleci.com/pipelines/github/ethereum/sourcify/${testReportObject.pipelineNumber}/workflows/${testReportObject.workflowId}/jobs/${testReportObject.jobNumber}`;
  const testReportHtmlURL =
    testReportObject &&
    `https://dl.circleci.com/private/output/job/${testReportObject.jobId}/artifacts/0/chain-tests-report/report.html`;

  const rows = sourcifyChains.map((chain, i) => {
    return (
      <tr
        key={`chain-row-${i}`}
        style={!chain.supported ? { color: "#ccc" } : {}}
      >
        <td>{chain.title || chain.name}</td>
        <td>
          <R>{chain.chainId}</R>
        </td>
        <td style={{ textAlign: "center", fontSize: "0.85rem" }}>
          {chain.supported ? "Verification" : "Not Supported"} <br />
          {chain.monitored ? "Monitoring" : ""}
        </td>
        <td>
          {
            <TestResult
              detailedUrl={testRunCircleURL}
              type="Standard"
              result={
                testMap &&
                testMap[chain.chainId] &&
                testMap[chain.chainId].normal
              }
              error={!!error}
            />
          }
        </td>
      </tr>
    );
  });
  return (
    <>
      {testReportObject && (
        <p>
          You can check out the complete{" "}
          <a target="_blank" rel="noreferrer" href={testReportHtmlURL}>
            HTML report
          </a>{" "}
          and the{" "}
          <a target="_blank" rel="noreferrer" href={testRunCircleURL}>
            detailed CI output
          </a>{" "}
          of the chain tests. Tested on: {testDate}
        </p>
      )}
      <ReactTooltip effect="solid" />
      <div>
        {error && (
          <div style={{ textAlign: "center", color: "indianRed" }}>{error}</div>
        )}
        {sourcifyChains.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            {" "}
            Currently there are{" "}
            <b>
              {sourcifyChains.filter((c) => c.supported).length} EVM chains
            </b>{" "}
            supported for verification on Sourcify.
            <br />
            {sourcifyChains.filter((c) => c.monitored).length} chains support{" "}
            <a href="/docs/monitoring">
              monitoring (i.e. automatic verification)
            </a>
            . Including the previously supported chains, there are{" "}
            {sourcifyChains.length} chains in total.
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Chain</th>
            <th>Chain ID</th>
            <th>Support Type</th>
            <th>Verification Tests</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};

export default Table;
