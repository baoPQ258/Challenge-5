/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Input, Modal, Space } from "antd";
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
  handleFile: (e: any) => void;
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
  handleFile,
}: PopUpProps) {
  const [valueInput, setValueInput] = useState(listCard?.name || "");
  const [isDisabled, setIsDisabled] = useState(name !== "edit");
  const [valueDescription, setValueDescription] = useState(
    listCard?.description || ""
  );
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
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateInputDescription = (e: any) => {
    setValueDescription(upperCase(e.target.value));
  };
  useEffect(() => {
    if (
      valueInput.trim().length > 0 &&
      valueDescription.trim().length > 0 &&
      valueInput.trim().length <= 50 &&
      valueDescription.trim().length <= 200
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [valueInput, valueDescription]);

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
              <UploadWidget handleFile={handleFile} image={image} setImage={setImage}></UploadWidget>
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
                  onKeyDown={(event) => {
                    if (/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  defaultValue={name === "edit" ? listCard?.name : ""}
                  status={valueInput.trim().length > 50 ? "error" : ""}
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
                  status={valueDescription.trim().length > 200 ? "error" : ""}
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
