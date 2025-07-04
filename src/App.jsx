import EditorWrapper from "./components/EditorWrapper";
import { hardcodedData } from "./hardcodeData";

export default function App() {
  const defaultWorkflow = {
    id: "my-new-flow",
    nodes: [],
    lines: [],
  };

  const handleSave = (data) => {
    // Misalnya kirim ke backend
    console.log("Workflow data to save:", data);
    // fetch('/api/save-workflow', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <div style={{ height: "100vh" }}>
      <EditorWrapper
        initialData={hardcodedData}
        onSave={handleSave}
      />
      ;
    </div>
  );
}
