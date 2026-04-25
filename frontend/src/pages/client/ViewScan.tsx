import { CameraView } from "../../scanner/CameraView";
import { ScanInstruction } from "../../components/ScanInstruction";

export const ViewScan = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-800">

      {/* Cámara */}
      <div className="w-full flex justify-center p-4">
        <div className="w-full max-w-md rounded-2xl overflow-hidden border-white/10 shadow-[0_0_40px_rgba(249,115,22,0.08)]">
          <CameraView />
        </div>
      </div>

      {/* Instrucción */}
      <div className="flex-1 flex items-center justify-center px-6 pt-10 pb-8" >
        <ScanInstruction />
      </div>

    </div>
  );
};