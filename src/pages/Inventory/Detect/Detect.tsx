import axios from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdImage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import DetectedIngredients from "../../../components/DetectedIngredients/DetectedIngredients";
import { Ingredient, InventoryItem } from "../../../types/inventory";
import { useAuth } from "../../../context/AuthContext";

type Item = Omit<InventoryItem, "id">;

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
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [ingredientAmounts, setIngredientAmounts] = useState<Item[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsDetecting(true);
    if (typeof acceptedFiles[0] === "undefined") return;

    const formData = new FormData();

    formData.append("image", acceptedFiles[0]);
    formData.append("imageType", acceptedFiles[0].type);

    await axios
      .post("http://localhost:8000/detect/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((r) => {
        setIsDetecting(false);
        setIngredientAmounts(
          r.data.detections.map((ingredient: Ingredient) => ({
            ingredient: ingredient,
            quantity: 0,
            unit: "",
          }))
        );
      });
  }

  const handleAddIngredient = () => {
    axios
      .get(`http://localhost:8000/inventory/user/?user_id=${user?.id}`)
      .then((res) =>
        axios
          .post(`http://localhost:8000/inventory/${res.data.id}/ingredients/`, {
            ingredients: ingredientAmounts.map((a) => ({
              ingredient: a.ingredient.id,
              amount: a.quantity,
              unit: a.unit,
            })),
          })
          .then((res) => {
            navigate("/inventory");
          })
      );
  };

  return (
    <div className="flex flex-col items-center gap-4 laptop:mx-20 hd:mx-60">
      <h1 className="text-3xl text-accent">Add Ingredient</h1>
      <div className="flex gap-4">
        <Link to={"/inventory/add"}>
          <a className="text-primary">Add manually</a>
        </Link>
        <a className="text-primary border-b">Image detection</a>
      </div>
      <div className="flex flex-col justify-start w-10/12 gap-4">
        <h2 className="text-2xl font-bold">Upload files</h2>
        <div
          {...getRootProps()}
          className="border border-dashed border-accent border-opacity-25 w-full flex flex-col items-center gap-2 p-10 rounded-[20px] bg-accent bg-opacity-5"
        >
          {uploadedImage && !isDragActive ? (
            <div className="w-full h-full">
              <img
                src={uploadedImage as string}
                alt="Upload"
                className="uploadedImage"
              />
            </div>
          ) : (
            <>
              <input {...getInputProps()} />
              <MdImage className="text-secondary text-4xl e" />
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
      {ingredientAmounts.length === 0 && !isDetecting ? (
        <div>No ingredients detected</div>
      ) : (
        <DetectedIngredients
          items={ingredientAmounts}
          setItems={setIngredientAmounts}
        />
      )}

      {ingredientAmounts.length !== 0 ? (
        <div className="h-12 w-10/12 m-4 flex sticky bottom-5">
          <div className="w-1/3 bg-gradient-to-r from-[#DB2DEE] via-[#E23CBF] to-[#E94B8F] rounded-l-[20px]">
            <p className="invisible">1</p>
          </div>
          <button
            onClick={handleAddIngredient}
            className="w-1/3 bg-gradient-to-r from-[#E94B8F] via-[#F15A60] to-[#F86930] text-base-100 flex justify-center items-center"
          >
            Add Ingredient
          </button>
          <div className="w-1/3 bg-gradient-to-r from-[#F86930] via-[#FF7801] to-[#FF7801] rounded-r-[20px] flex justify-start items-center">
            <p className="invisible">1</p>✨
          </div>
        </div>
      ) : (
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
      )}
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
