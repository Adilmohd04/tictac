const Cell = ({ id, cell, setcells, go, setgo, cells, wm ,onClick }) => {
  const handleClick = (e) => {
    const cellElement = e.currentTarget.querySelector('.cell'); // Select the nested cell element

    if (!wm && cellElement) {
      const taken =
        cellElement.classList.contains('circle') ||
        cellElement.classList.contains('cross');

      if (!taken) {
        if (go === "circle") {
          e.target.firstChild.classList.add("circle");
          handleCellChange("circle");
          setgo("cross");
        } else if (go === "cross") {
          e.target.firstChild.classList.add("cross");
          handleCellChange("cross");
          setgo("circle");
        }
        
      }
    }
  };

  const handleCellChange = (className) => {
    const nextcells = cells.map((cell, index) =>
      index === id ? className : cell
    );
    setcells(nextcells);
  };

  return (
    <div className="square" id={id} onClick={handleClick}>
      <div className={`cell ${cell}`}></div>
    </div>
  );
};

export default Cell;
