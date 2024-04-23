const DisplayCard = (props) => {
  return (
    <div className="container mx-9">
      <div className="relative bg-gradient-to-r from bg-gradient-to-r from-sky-600 to-cyan-400 shadow-md transform hover:scale-105 transition duration-300 ease-in-out rounded-lg overflow-hidden flex justify-center ">
        <div className="p-4">
          <h5 className="text-white text-lg font-bold mb-2 flex justify-center">
            {props.title} Employees
          </h5>
          <h4 className="text-white text-3xl font-bold flex justify-center">
            {props.count}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
