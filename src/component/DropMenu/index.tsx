import { CardItem } from "../../interface/card";
import { upperCase } from "../../util/upperCase";
import PopUp from "../PopUp";
import { useState } from "react";

interface DropMenuProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  setListCard: React.Dispatch<React.SetStateAction<CardItem[]>>;
  setData: React.Dispatch<React.SetStateAction<CardItem[]>>;
  listCard: CardItem;
  data: CardItem[];
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

function DropMenu({
  children,
  setListCard,
  listCard,
  setData,
  data,
  setOpenDrawer,
}: DropMenuProps) {
  const [open, setOpen] = useState(false);
  const [isdDelete, setIsDelete] = useState(false);
  const [image, setImage] = useState(listCard.image || "");
  const dataLocal: CardItem[] =
    JSON.parse(localStorage.getItem("items") as string) || ([] as CardItem[]);
  const newArr = dataLocal.filter((item: CardItem) => item.id !== listCard.id);
  const arrDefault = data.filter((item: CardItem) => item.id !== listCard.id);
  const indexDataLocal = dataLocal.findIndex((item) => item.id === listCard.id);
  const indexData = data.findIndex((item) => item.id === listCard.id);

  const showModal = () => {
    setOpen(true);
  };
  const showModalDelete = () => {
    setIsDelete(true);
  };
  const handleOk = (valueInput: string, valueDescription: string) => {
    setOpen(false);
    if (data.includes(listCard)) {
      data[indexData].name = upperCase(valueInput);
      data[indexData].description = upperCase(valueDescription);
      data[indexData].image = image;
      setData(data);
      setOpen(false);
    } else {
      dataLocal[indexDataLocal].name = upperCase(valueInput);
      dataLocal[indexDataLocal].description = upperCase(valueDescription);
      dataLocal[indexDataLocal].image = image;
      localStorage.setItem("items", JSON.stringify(dataLocal));
      setListCard(dataLocal);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setIsDelete(false);
  };
  const handleDelete = () => {
    setIsDelete(false);
    if (data.includes(listCard)) {
      setData(arrDefault);
    } else {
      localStorage.setItem("items", JSON.stringify(newArr));
      setListCard(newArr);
    }
    setOpenDrawer(false);
  };
  return (
    <>
      <div className="dropdown">
        {children}
        <div className="dropdown-content">
          {open ? (
            <PopUp
              handleOk={handleOk}
              handleCancel={handleCancel}
              open={open}
              name={"edit"}
              listCard={listCard}
              image={image}
              setImage={setImage}
            >
              <button className="btn-icon btn-menu" onClick={showModal}>
                Edit
              </button>
            </PopUp>
          ) : (
            <button className="btn-icon btn-menu" onClick={showModal}>
              Edit
            </button>
          )}
          {isdDelete ? (
            <PopUp
              handleOk={handleOk}
              handleCancel={handleCancel}
              open={isdDelete}
              name={"delete"}
              handleDelete={handleDelete}
              image={image}
              setImage={setImage}
            >
              <button className="btn-icon btn-menu" onClick={showModalDelete}>
                Delete
              </button>
            </PopUp>
          ) : (
            <button className="btn-icon btn-menu" onClick={showModalDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default DropMenu;
