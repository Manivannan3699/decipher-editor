import { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import "codemirror/mode/xml/xml";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

export default function DecipherSurveyEditor() {
  const [code, setCode] = useState("<survey>\n  <!-- Start writing your Decipher survey script here -->\n</survey>");
  const [errors, setErrors] = useState([]);

  // Function to validate Decipher script
  const validateCode = () => {
    let newErrors = [];
    if (!code.includes("<survey>")) newErrors.push("Missing <survey> root element");
    if (!code.includes("</survey>")) newErrors.push("Missing closing </survey> tag");
    if (!code.match(/<question id=\".*?\"/)) newErrors.push("At least one question must be defined with an ID");
    setErrors(newErrors);
  };

  // Function to export the script as a file
  const exportFile = () => {
    const blob = new Blob([code], { type: "text/xml" });
    saveAs(blob, "decipher_survey.xml");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Decipher Survey Editor</h1>
      <CodeMirror
        value={code}
        options={{ mode: "xml", theme: "material-darker", lineNumbers: true }}
        onBeforeChange={(editor, data, value) => setCode(value)}
      />
      <div className="mt-4 flex gap-2">
        <Button onClick={validateCode}>Validate</Button>
        <Button onClick={exportFile}>Export</Button>
      </div>
      {errors.length > 0 && (
        <div className="mt-4 bg-red-100 p-2 rounded text-red-700">
          <h2 className="font-semibold">Validation Errors:</h2>
          <ul>
            {errors.map((err, index) => (
              <li key={index}>- {err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
