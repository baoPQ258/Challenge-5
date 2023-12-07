import {  Flex, Input, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { upperCase } from "../../util/upperCase";
import { CardItem } from "../../interface/card";
import UploadWidget from "../UploadWidget";

interface PopUpProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  handleOk: (valueInput: string, valueDescription: string) => void;
  handleCancel: () => void;
  handleDelete?: () => void;
  open: boolean;
  name?: string;
  listCard?: CardItem;
  image?: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

function PopUp({
  children,
  handleOk,
  handleCancel,
  handleDelete,
  open,
  name,
  listCard,
  image,
  setImage,
}: PopUpProps) {
  const [valueInput, setValueInput] = useState(listCard?.name || "");
  const [isDisabled, setIsDisabled] = useState(name !== "edit");
  const [valueDescription, setValueDescription] = useState(
    listCard?.description || ""
  );
  const pattern = /^[a-zA-Z .,]+$/;
  let background = "";

  const input: HTMLInputElement | null = document.querySelector("input");
  if (input) {
    input.addEventListener("keydown", (event: KeyboardEvent) => {
      if (/\d/g.test(event.key)) {
        event.preventDefault();
      }
    });
  }
  if (name == "create" || name == "edit") {
    background = "btn-create-form bg-pupple";
  } else {
    background = "btn-create-form bg-red";
  }
  const validateInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(upperCase(e.target.value));

    if (e.target.value === "") {
      e.target.style.border = "1px solid black";
    } else if (!pattern.test(e.target.value) && e.target.value.trim()) {
      e.target.style.border = "1px solid red";
    } else {
      e.target.style.border = "1px solid black";
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateInputDescription = (e: any) => {
    setValueDescription(upperCase(e.target.value));

    if (e.target.value === "") {
      e.target.style.border = "1px solid black";
      isDisabled;
    } else if (!pattern.test(e.target.value)) {
      e.target.style.border = "1px solid red";
    } else {
      e.target.style.border = "1px solid black";
    }
  };
  useEffect(() => {
    if (
      valueInput.trim().length > 0 &&
      valueDescription.trim().length > 0 &&
      pattern.test(valueInput) &&
      pattern.test(valueDescription)
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [valueInput, valueDescription, pattern]);

  return (
    <>
      <Space>{children}</Space>
      <Modal
        open={open}
        onOk={() => handleOk(valueInput, valueDescription)}
        onCancel={handleCancel}
        footer={() => null}
      >
        {name == "delete" ? (
          <p>
            <Flex gap={32} justify="center" align="center" vertical>
              <div>
                <h1 className="title-delete">Delete card?</h1>
              </div>
              <p className="description-delete">
                You will not be able to restore the card after taking this
                action.
              </p>
            </Flex>
            <Flex gap={16} className="group-btn w-100">
              <button className={background} onClick={handleDelete}>
                Delete
              </button>
              <button className="btn-create-form" onClick={handleCancel}>
                Cancel
              </button>
            </Flex>
          </p>
        ) : (
          <Flex gap={32} justify="center" align="center" vertical>
            <div>
              <h1>{name === "create" ? "Create card" : "Edit Card"}</h1>
            </div>
            <Flex gap={24} vertical className="w-100">
              <UploadWidget image={image} setImage={setImage}></UploadWidget>
              <Flex gap={8} className="name-group" vertical>
                <Flex justify="space-between" align="space-between">
                  <p className="text-popup">Name</p>
                  <p className="number-input">{valueInput.trim().length}/50</p>
                </Flex>
                <Input
                  name="iput-name"
                  type="text"
                  className="input-name"
                  placeholder="Enter your name"
                  onChange={validateInputName}
                  maxLength={50}
                  defaultValue={name === "edit" ? listCard?.name : ""}
                />
              </Flex>
              <Flex gap={8} className="name-group" vertical>
                <Flex justify="space-between" align="space-between">
                  <p className="text-popup">Description</p>
                  <p className="number-input">
                    {valueDescription.trim().length}/200
                  </p>
                </Flex>
                <TextArea
                  name="input-description"
                  placeholder="Type description here"
                  autoSize={{ minRows: 4, maxRows: 5 }}
                  onChange={validateInputDescription}
                  maxLength={200}
                  defaultValue={name === "edit" ? listCard?.description : ""}
                />
              </Flex>
            </Flex>
            <Flex gap={16} className="group-btn w-100">
              <button
                type="submit"
                className={background}
                onClick={() => handleOk(valueInput, valueDescription)}
                disabled={name === "delete" ? false : isDisabled}
              >
                {name === "create" ? "Create" : name === "edit" ? "Edit" : ""}
              </button>
              <button className="btn-create-form" onClick={handleCancel}>
                Cancel
              </button>
            </Flex>
          </Flex>
        )}
      </Modal>
    </>
  );
}

export default PopUp;
