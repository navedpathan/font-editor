"use client";
import React, { useState } from "react";

function Page() {
  const [text, setText] = useState("");
  const [apply, setApply] = useState("");
  const [size, setSize] = useState(16);
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Arial");
  const [textHistory, setTextHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSize(newSize);
    setTextHistory((prevHistory) => [
      ...prevHistory.slice(0, currentStep + 1),
      newSize,
    ]);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    setTextHistory((prevHistory) => [
      ...prevHistory.slice(0, currentStep + 1),
      newColor,
    ]);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleFontChange = (event) => {
    const newFont = event.target.value;
    setFont(newFont);
    setTextHistory((prevHistory) => [
      ...prevHistory.slice(0, currentStep + 1),
      newFont,
    ]);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Undo & Redo
  const handleUndo = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
      setSize(textHistory[currentStep - 1]);
      setColor(textHistory[currentStep - 1]);
      setFont(textHistory[currentStep - 1]);
    }
  };

  const handleRedo = () => {
    if (currentStep < textHistory.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
      setSize(textHistory[currentStep + 1]);
      setColor(textHistory[currentStep + 1]);
      setFont(textHistory[currentStep + 1]);
    }
  };

  // Font Family
  const fontFamilies = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
  ];
  fontFamilies.sort();

  // Drag n Drop 
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setPosition({
      x: e.clientX - e.target.offsetLeft,
      y: e.clientY - e.target.offsetTop
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - e.target.offsetLeft,
        y: e.clientY - e.target.offsetTop
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-gray-200 py-20">
      <div className="flex absolute top-2 left-2 mb-6">
        <button
          onClick={handleUndo}
          disabled={currentStep === 0}
          className="cursor-pointer bg-white mx-2 px-4 py-1 rounded-lg border border-black"
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          disabled={currentStep === textHistory.length - 1}
          className="cursor-pointer bg-white mx-2 px-4 py-1 rounded-lg border border-black"
        >
          Redo
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setApply(text);
        }}
      >
        <div className="flex justify-center items-center mx-40">
          <div
            className="container bg-white w-full m-2 shadow-lg rounded-lg flex justify-center items-center"
            style={{ height: '28rem', position: 'relative' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <textarea
            type="text"
            value={apply}
            placeholder="New Text..."
              className="bg-white flex border border-dashed border-gray-600 py-2 px-5 rounded-lg"
              style={{
                fontSize: `${size}px`,
                color: color,
                fontFamily: font,
                position: 'absolute',
                left: position.x,
                top: position.y,
                cursor: isDragging ? "grabbing" : "grab",
              }}
              onMouseDown={handleMouseDown}
            />
               
          </div>

          <div className="flex flex-col mx-6">
            <label>Font</label>
            <select
              value={font}
              onChange={handleFontChange}
              className="rounded-lg p-1"
            >
              {fontFamilies.map((font, index) => (
                <option key={index} value={font}>
                  {font}
                </option>
              ))}
            </select>
            <div className="flex my-5 justify-between">
              <span className="flex flex-col">
                <label>Size</label>
                <input
                  type="number"
                  value={size}
                  onChange={handleSizeChange}
                  className="w-16 rounded-lg p-1"
                />
              </span>
              <span className="flex flex-col">
                <label>Color</label>
                <input
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                />
              </span>
            </div>
            <span className="relative bottom-0">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="rounded-lg p-1"
              placeholder="Add Text..."
            />
            <button type="submit" className="hidden">
              Apply
            </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Page;
