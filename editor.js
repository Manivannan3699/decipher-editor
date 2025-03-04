// ✅ Check if React is loaded BEFORE running any code
console.log("Checking React:", typeof React);

if (typeof React === "undefined") {
  console.error("🚨 React is NOT loaded! Check index.html script order.");
} else {
  console.log("✅ React is loaded successfully!");

  function DecipherSurveyEditor() {
    const [code, setCode] = React.useState("<survey>\n  <!-- Start writing your Decipher survey script here -->\n</survey>");
    const [errors, setErrors] = React.useState([]);

    React.useEffect(() => {
      console.log("✅ CodeMirror is initializing...");
      const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
        mode: "xml",
        theme: "material-darker",
        lineNumbers: true
      });

      editor.on("change", (cm) => {
        setCode(cm.getValue());
      });

    }, []);

    function validateCode() {
      let newErrors = [];
      if (!code.includes("<survey>")) newErrors.push("Missing <survey> root element");
      if (!code.includes("</survey>")) newErrors.push("Missing closing </survey> tag");
      if (!code.match(/<question id=\".*?\"/)) newErrors.push("At least one question must be defined with an ID");
      setErrors(newErrors);
    }

    function exportFile() {
      const blob = new Blob([code], { type: "text/xml" });
      saveAs(blob, "decipher_survey.xml");
    }

    return React.createElement("div", { className: "p-4" },
      React.createElement("h1", { className: "text-xl font-bold mb-2" }, "Decipher Survey Editor"),
      React.createElement("textarea", { id: "editor", defaultValue: code, style: { width: "100%", height: "200px" } }),
      React.createElement("div", { className: "mt-4 flex gap-2" },
        React.createElement("button", { onClick: validateCode }, "Validate"),
        React.createElement("button", { onClick: exportFile }, "Export")
      ),
      errors.length > 0 && React.createElement("div", { className: "mt-4 bg-red-100 p-2 rounded text-red-700" },
        React.createElement("h2", { className: "font-semibold" }, "Validation Errors:"),
        React.createElement("ul", {},
          errors.map((err, index) => React.createElement("li", { key: index }, "- " + err))
        )
      )
    );
  }

  ReactDOM.render(
    React.createElement(DecipherSurveyEditor),
    document.getElementById("root")
  );
}
