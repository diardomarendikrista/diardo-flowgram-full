import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditorWrapper from "components/EditorWrapper";

export default function FlowgramPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workflowData, setWorkflowData] = useState(null);

  // load data
  useEffect(() => {
    const savedFlowgrams = JSON.parse(localStorage.getItem("flowgrams")) || [];
    const currentFlowgram = savedFlowgrams.find((flow) => flow.id === id);

    if (currentFlowgram) {
      setWorkflowData(currentFlowgram.data);
    } else {
      alert(`Flowgram with id "${id}" not found.`);
      navigate("/");
    }
  }, [id, navigate]);

  const handleSave = (updatedData) => {
    // 1. Ambil semua flowgram yang ada dari localStorage
    const allFlowgrams = JSON.parse(localStorage.getItem("flowgrams")) || [];

    // 2. Buat array baru dengan flowgram yang sudah diperbarui
    const updatedFlowgrams = allFlowgrams.map((flow) => {
      // Jika ID-nya cocok dengan yang sedang diedit
      if (flow.id === id) {
        // Kembalikan data flowgram yang sama, tapi dengan properti 'data' yang baru
        return { ...flow, data: updatedData };
      }
      // Jika tidak, kembalikan flowgram seperti aslinya
      return flow;
    });

    // 3. Simpan array yang sudah diperbarui kembali ke localStorage
    localStorage.setItem("flowgrams", JSON.stringify(updatedFlowgrams));

    // 4. Beri notifikasi ke pengguna (opsional tapi sangat disarankan)
    alert("Flowgram saved successfully!");

    navigate("/");
  };

  // harus selesai load, kalau tidak, canvas akan stuck kosong
  if (!workflowData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">
          Loading Editor...
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh" }}>
      <EditorWrapper
        initialData={workflowData}
        onSave={handleSave}
      />
    </div>
  );
}
