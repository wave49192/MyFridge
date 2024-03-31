import axios from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdImage } from "react-icons/md";

const DetectPage = () => {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = function () {
      setUploadedImage(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });
  const [uploadedImage, setUploadedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [detected, setDetected] = useState<Detection>({ detections: [] });
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsDetecting(true);

    if (typeof acceptedFiles[0] === "undefined") return;

    const formData = new FormData();

    formData.append("image", acceptedFiles[0]);

    await axios.post("http://localhost:8000/detect/", formData).then((r) => {
      setTimeout(() => {
        setDetected(r.data);
        setIsDetecting(false);
      }, 2000);
    });
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl text-accent">Add Ingredient</h1>
      <div className="flex gap-4">
        <a className="text-primary">Add manually</a>
        <a className="text-primary">Image detection</a>
      </div>
      <div className="flex flex-col justify-start w-10/12 gap-4">
        <h2 className="text-2xl font-bold">Upload files</h2>
        <div
          {...getRootProps()}
          className="border border-dashed border-accent border-opacity-25 w-full flex flex-col items-center gap-2 p-10 rounded-[20px] bg-accent bg-opacity-5"
        >
          {uploadedImage && !isDragActive ? (
            <div className="w-full h-full">
              <img src={uploadedImage as string} alt="Upload" />
            </div>
          ) : (
            <>
              <input {...getInputProps()} />
              <MdImage className="text-secondary text-4xl" />
              <p className="text-accent">
                {!isDragActive ? "Drag and drop" : "Drop it here!"}
              </p>
              <button className="btn bg-primary text-base-100">
                Choose Image
              </button>
            </>
          )}
        </div>
      </div>
      {detected.detections.length !== 0 ? (
        detected.detections.map((v, i) => (
          <div
            key={i}
            className="flex px-4 py-3 my-2 bg-primary-2 bg-opacity-25 rounded-2xl laptop:text-xl"
          >
            <p className="text-base font-bold text-secondary">{v}</p>
          </div>
        ))
      ) : (
        <></>
      )}
      <div className="h-12 w-10/12 m-4 flex sticky bottom-5">
        <div className="w-1/3 bg-gradient-to-r from-[#DB2DEE] via-[#E23CBF] to-[#E94B8F] rounded-l-[20px]">
          <p className="invisible">1</p>
        </div>
        <button
          onClick={handleOnSubmit}
          className="w-1/3 bg-gradient-to-r from-[#E94B8F] via-[#F15A60] to-[#F86930] text-base-100 flex justify-center items-center"
        >
          {!isDetecting ? "Start detecting" : <Loading />}
        </button>
        <div className="w-1/3 bg-gradient-to-r from-[#F86930] via-[#FF7801] to-[#FF7801] rounded-r-[20px] flex justify-start items-center">
          <p className="invisible">1</p>
          {!isDetecting ? "✨" : <></>}
        </div>
      </div>
    </div>
  );
};

const Loading = () => (
  <>
    <span className="loading loading-ring loading-xs"></span>
    <span className="loading loading-ring loading-sm"></span>
    <span className="loading loading-ring loading-md"></span>
    <span>Detecting</span>
    <span className="loading loading-ring loading-md"></span>
    <span className="loading loading-ring loading-sm"></span>
    <span className="loading loading-ring loading-xs"></span>
  </>
);

export default DetectPage;
