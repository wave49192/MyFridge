import React from "react";

const Pagination = () => {
  return (
    <div className="join gap-[3px] self-end mr-8">
      <button className="join-item rounded-full btn bg-accent bg-opacity-5 text-primary">
        &lt;
      </button>
      <button className="join-item btn bg-accent bg-opacity-5 text-accent text-base">
        1 of 10
      </button>
      <button className="join-item rounded-full btn text-primary bg-accent bg-opacity-5">
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
