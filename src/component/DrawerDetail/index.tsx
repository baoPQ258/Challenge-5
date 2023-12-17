import { Checkbox, Drawer, Flex, Input } from "antd";
import imgDefault from "../../assets/images/img-default.svg";
import more from "../../assets/images/more-fill.svg";
import heart from "../../assets/images/heart.svg";
import { useEffect, useState } from "react";
import { CardItem } from "../../interface/card";
import { toK } from "../../util/numberToK";
import CommentComponent from "../Comment";
import { Comment } from "../../interface/card";
import arrowLine from "../../assets/images/arrow-left-line.svg";
import DropMenu from "../DropMenu";
import { upperCase } from "../../util/upperCase";

interface DrawerDetailProps {
  onClose: () => void;
  openPostComment: () => void;
  onclikContent: () => void;
  open: boolean;
  isPost: boolean;
  listCard: CardItem;
  data: CardItem[];
  setListCard: React.Dispatch<React.SetStateAction<CardItem[]>>;
  setData: React.Dispatch<React.SetStateAction<CardItem[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPost: React.Dispatch<React.SetStateAction<boolean>>;
}

function DrawerDetail({
  onClose,
  open,
  openPostComment,
  isPost,
  onclikContent,
  listCard,
  setListCard,
  setData,
  data,
  setOpen,
  setIsPost,
}: DrawerDetailProps) {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputCommentValue, setInputCommentValue] = useState("");
  const [number, setNumber] = useState(5);
  const dataLocal: CardItem[] =
    JSON.parse(localStorage.getItem("items") as string) || ([] as CardItem[]);
  const indexDataLocal = dataLocal.findIndex((item) => item.id === listCard.id);
  const indexData = data.findIndex((item) => item.id === listCard.id);
  const onChange = () => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };
  const postComment = () => {
    if (data.includes(listCard)) {
      data[indexData].comment.unshift({
        name: !checked ? upperCase(inputNameValue) : "Unknow",
        description: upperCase(inputCommentValue),
        date: new Date(),
      });
      data[indexData].quantity = listCard?.quantity + 1;
      setData(data);
    } else {
      dataLocal[indexDataLocal].comment.unshift({
        name: !checked ? upperCase(inputNameValue) : "Unknow",
        description: upperCase(inputCommentValue),
        date: new Date(),
      });
      dataLocal[indexDataLocal].quantity = listCard?.quantity + 1;
      localStorage.setItem("items", JSON.stringify(dataLocal));
      setListCard(dataLocal);
    }
    setIsPost(true);
    if (checked) {
      setChecked(false);
    }
  };

  const inputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(e.target.value.trim());
  };
  const inputCommnentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCommentValue(e.target.value.trim());
  };
  const showMore = () => {
    setNumber(number + 5);
  };
  const back = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (
      inputNameValue.trim() &&
      inputCommentValue.trim() &&
      inputNameValue.trim().length <= 50 &&
      inputCommentValue.trim().length <= 50
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputNameValue, inputCommentValue, checked]);
  useEffect(() => {
    if (open) {
      setNumber(5);
    }
  }, [open]);

  return (
    <>
      <Drawer
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"right"}
      >
        <Flex gap={12} className="dot-2" align="center" justify="space-between">
          <Flex gap={12} align="center">
            <img src={arrowLine} onClick={back}></img>
            <p className="back">Detail</p>
          </Flex>
          <div className="img-dot-2">
            <DropMenu
              setData={setData}
              listCard={listCard}
              setListCard={setListCard}
              data={data}
              setOpenDrawer={setOpen}
            >
              {" "}
              <button className="btn-icon">
                <img src={more} alt="Img three dot"></img>
              </button>
            </DropMenu>
          </div>
        </Flex>
        <Flex
          className="drawer"
          justify="center"
          align="center"
          vertical
          gap={24}
          onClick={onclikContent}
        >
          <Flex
            className="header-drawer"
            gap={109}
            justify="center"
            align="flex-start"
          >
            <img
              className="min-w"
              src={listCard.image || imgDefault}
              alt="Img defalt"
            ></img>
          </Flex>
          <div className="img-dot">
            <DropMenu
              setData={setData}
              listCard={listCard}
              setListCard={setListCard}
              data={data}
              setOpenDrawer={setOpen}
            >
              {" "}
              <button className="btn-icon">
                <img src={more} alt="Img three dot"></img>
              </button>
            </DropMenu>
          </div>
          <Flex vertical gap={16}>
            <Flex justify="center">
              <h1 className="title-delete">{listCard.name}</h1>
            </Flex>
            <p className="description">{listCard.description}</p>
          </Flex>
          <Flex className="like" justify="flex-start">
            <button className="btn-icon btn-heart btn-heart-detai">
              <Flex gap={8} align="center">
                <img className="heart-detail" src={heart} alt="heart" />
                <p className="text-heart-detail">{toK(listCard.like)}</p>
              </Flex>
            </button>
          </Flex>
          <Flex className="comment" vertical gap={16}>
            <p className="comment-text-detail">
              Comments
              <span className="quantity-comment-detail">
                ({toK(listCard.quantity)})
              </span>
            </p>
            <Flex gap={20} vertical>
              {listCard?.comment
                .slice(0, number)
                .map((item: Comment, index: number) => {
                  return (
                    <CommentComponent
                      comment={item}
                      key={index}
                    ></CommentComponent>
                  );
                })}
            </Flex>
          </Flex>
          {listCard?.comment.length > number ? (
            <Flex justify="flex-start" className="w-100">
              <button className="btn-icon btn-more-comment" onClick={showMore}>
                More comments
              </button>
            </Flex>
          ) : (
            ""
          )}
        </Flex>
        {isPost ? (
          <Flex className="write-comment-detail" justify="center">
            <div className="group-btn-detail">
              <button className="btn-write-comment" onClick={openPostComment}>
                Write Comment
              </button>
            </div>
          </Flex>
        ) : (
          <Flex vertical gap={12} className="post-comment">
            <Checkbox className="check-text" onChange={onChange}>
              Comment as Unknown
            </Checkbox>
            <Flex vertical gap={8}>
              <Input
                className="input-name-post"
                onChange={inputNameChange}
                placeholder="Your name"
                disabled={checked}
                onKeyDown={(event) => {
                  const key = event.key;
                  const isAlphabeticOrSpace =
                    (key >= "a" && key <= "z") ||
                    (key >= "A" && key <= "Z") ||
                    key === " ";
                  if (!isAlphabeticOrSpace) {
                    event.preventDefault();
                  }
                }}
                status={inputNameValue.trim().length > 50 ? "error" : ""}
              ></Input>
              <Input
                className="input-name-post"
                onChange={inputCommnentChange}
                placeholder="Type your comment here"
                status={inputCommentValue.trim().length > 50 ? "error" : ""}
              ></Input>
            </Flex>
            <button
              className="btn-post"
              disabled={disabled}
              onClick={postComment}
            >
              Post comment
            </button>
          </Flex>
        )}
      </Drawer>
    </>
  );
}

export default DrawerDetail;
