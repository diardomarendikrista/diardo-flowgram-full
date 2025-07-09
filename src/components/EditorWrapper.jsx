import { useRef } from "react";
import {
  EditorRenderer,
  FreeLayoutEditorProvider,
} from "@flowgram.ai/free-layout-editor";
import "@flowgram.ai/free-layout-editor/index.css";

import { nodeRegistries } from "../flowgram/nodes";
import { useEditorProps } from "../flowgram/hooks";
import { DemoTools } from "../flowgram/components/tools";
import {
  SidebarProvider,
  SidebarRenderer,
} from "../flowgram/components/sidebar";

export default function EditorWrapper({ initialData, onSave, onChange }) {
  const editorCtxRef = useRef(null);

  // Ambil props default dari hook template
  const editorProps = useEditorProps(initialData, nodeRegistries);

  const handleSave = () => {
    // Cek , konteks sudah tersimpan di ref atau belum
    if (editorCtxRef.current && editorCtxRef.current.document) {
      // Ambil data JSON terbaru dari konteks yang tersimpan
      const latestData = editorCtxRef.current.document.toJSON();

      // Kirim data ke komponen induk
      onSave(latestData);

      console.log("Workflow data saved:", latestData);
    } else {
      console.error("Editor context not available yet.");
    }
  };

  // Gabungkan props default dengan onAllLayersRendered kustom kita
  // `onAllLayersRendered` dipanggil saat editor siap dan memberikan `ctx`
  const finalEditorProps = {
    ...editorProps,
    onAllLayersRendered: (ctx) => {
      // Simpan konteks editor ke dalam ref buat dipake nanti
      editorCtxRef.current = ctx;
      console.log("Editor context captured and ready.");
    },
  };

  return (
    <div className="h-screen doc-free-feature-overview">
      <FreeLayoutEditorProvider
        {...finalEditorProps}
        onChange={onChange}
      >
        <SidebarProvider>
          <div className="demo-container">
            <EditorRenderer className="demo-editor" />
          </div>
          <DemoTools />
          <SidebarRenderer />

          <div className="absolute bottom-4 right-4 z-50">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              💾 Save
            </button>
          </div>
        </SidebarProvider>
      </FreeLayoutEditorProvider>
    </div>
  );
}
