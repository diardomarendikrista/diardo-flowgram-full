import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hardcodedData } from "../hardcodeData";

export default function Home() {
  const [flowgrams, setFlowgrams] = useState([]);
  const navigate = useNavigate();

  // Load data (localstorage)
  useEffect(() => {
    // Coba ambil data dari localStorage
    let flowgramsToLoad = JSON.parse(localStorage.getItem("flowgrams"));

    // Jika tidak ada data (kunjungan pertama), buat data contoh
    if (!flowgramsToLoad || flowgramsToLoad.length === 0) {
      console.log("LocalStorage kosong, membuat flowgram contoh...");

      const newId = "flowgram-default-01"; // ID statis untuk contoh
      const defaultFlowgram = {
        id: newId,
        name: "Contoh Flowgram Bawaan",
        data: { ...hardcodedData, id: newId }, // Gabungkan hardcodedData dengan ID
      };

      // Jadikan data contoh sebagai data yang akan di-load
      flowgramsToLoad = [defaultFlowgram];

      // Simpan data contoh ini ke localStorage untuk kunjungan berikutnya
      localStorage.setItem("flowgrams", JSON.stringify(flowgramsToLoad));
    }

    // Set state komponen dengan data yang ada atau yang baru dibuat
    setFlowgrams(flowgramsToLoad);
  }, []);

  const handleCreateNew = () => {
    const newId = `flowgram-${Date.now()}`;

    // Definisikan node Start
    const startNode = {
      id: "start_node",
      type: "start",
      meta: { position: { x: 200, y: 300 } }, // Atur posisi awal
      data: {
        title: "Start",
        outputs: {
          type: "object",
          properties: {
            query: {
              type: "string",
              default: "Hello Flow.",
            },
            enable: {
              type: "boolean",
              default: true,
            },
            array_obj: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  int: {
                    type: "number",
                  },
                  str: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    };

    // Definisikan node End
    const endNode = {
      id: "end_node",
      type: "end",
      meta: { position: { x: 800, y: 300 } }, // Atur posisi agak jauh dari start
      data: {
        title: "End",
        inputs: {
          type: "object",
          properties: {
            result: {
              type: "string",
            },
          },
        },
      },
    };

    const newFlowgram = {
      id: newId,
      name: `New Flowgram - ${new Date().toLocaleDateString()}`,
      data: {
        id: newId,
        nodes: [startNode, endNode], // Masukkan node Start dan End
        lines: [], // Masukkan garis penghubung
      },
    };

    // Ambil data lama, atau buat array kosong jika belum ada (karena kita pakai localstorage)
    const allFlowgrams = JSON.parse(localStorage.getItem("flowgrams")) || [];

    // Tambahkan flowgram baru ke daftar
    const updatedFlowgrams = [...allFlowgrams, newFlowgram];

    // Simpan kembali ke localStorage
    localStorage.setItem("flowgrams", JSON.stringify(updatedFlowgrams));

    // Arahkan pengguna ke halaman editor
    navigate(`/flowgram/${newId}`);
  };

  // Fungsi untuk menghapus flowgram
  const handleDelete = (idToDelete) => {
    if (window.confirm("Are you sure you want to delete this flowgram?")) {
      const updatedFlowgrams = flowgrams.filter(
        (flow) => flow.id !== idToDelete
      );
      setFlowgrams(updatedFlowgrams);
      localStorage.setItem("flowgrams", JSON.stringify(updatedFlowgrams));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-8">
        <header className="flex justify-between items-center mb-8 pb-4 border-b">
          <h1 className="text-4xl font-bold text-gray-800">My Flowgrams</h1>
          <button
            onClick={handleCreateNew}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            + Create New
          </button>
        </header>

        <main>
          {flowgrams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flowgrams.map((flow) => (
                <div
                  key={flow.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-700 truncate">
                      {flow.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">ID: {flow.id}</p>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                    <Link
                      to={`/flowgram/${flow.id}`}
                      className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                      Open Editor
                    </Link>
                    <button
                      onClick={() => handleDelete(flow.id)}
                      className="text-red-500 hover:text-red-700 font-semibold text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700">
                No flowgrams yet!
              </h2>
              <p className="text-gray-500 mt-2 mb-6">
                Click "Create New" to start your first workflow.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
