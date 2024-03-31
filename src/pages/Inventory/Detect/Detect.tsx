import { MdImage } from "react-icons/md";

const DetectPage = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl text-accent">Add Ingredient</h1>
      <div className="flex gap-4">
        <a className="text-primary">Add manually</a>
        <a className="text-primary">Image detection</a>
      </div>
      <div className="flex flex-col justify-start w-10/12 gap-4">
        <h2 className="text-2xl font-bold">Upload files</h2>
        <div className="border border-dashed border-accent border-opacity-25 w-full flex flex-col items-center gap-2 p-10 rounded-[20px] bg-accent bg-opacity-5">
          <MdImage className="text-secondary text-4xl" />
          <p className="text-accent">Drag and drop</p>
          <button className="btn bg-primary text-base-100">Choose Image</button>
          <input type="file" hidden />
        </div>
      </div>
      <div className="h-12 w-10/12 m-4 flex ">
        <div className="w-1/3 bg-gradient-to-r from-[#DB2DEE] via-[#E23CBF] to-[#E94B8F] rounded-l-[20px]">
          <p className="invisible">1</p>
        </div>
        <div className="w-1/3 bg-gradient-to-r from-[#E94B8F] via-[#F15A60] to-[#F86930] text-base-100 flex justify-center items-center">
          Start detecting 
        </div>
        <div className="w-1/3 bg-gradient-to-r from-[#F86930] via-[#FF7801] to-[#FF7801] rounded-r-[20px] flex justify-start items-center">
          <p className="invisible">1</p>
          ✨
        </div>
      </div>
    </div>
  );
};

export default DetectPage;
