import { Col, Card, Flex, Row } from "antd";
import imgDefault from "../../assets/images/img-default.svg";
import chat from "../../assets/images/chat.svg";
import heart from "../../assets/images/heart.svg";
import more from "../../assets/images/more-fill.svg";
import heartFill from "../../assets/images/heart-fill.svg";

import DropMenu from "../DropMenu";
import { useState } from "react";
import { CardItem } from "../../interface/card";
import DrawerDetail from "../DrawerDetail";
import { toK } from "../../util/numberToK";

interface CardItemProps {
  listCard: CardItem;
  data: CardItem[];
  setListCard: React.Dispatch<React.SetStateAction<CardItem[]>>;
  setData: React.Dispatch<React.SetStateAction<CardItem[]>>;
}

function CardState({ listCard, setListCard, setData, data }: CardItemProps) {
  const [fill, isFill] = useState(heart);
  const [isPost, setIsPost] = useState(true);
  const [open, setOpen] = useState(false);
  const [classText, setClassText] = useState("text-heart");
  const dataLocal: CardItem[] =
    JSON.parse(localStorage.getItem("items") as string) || ([] as CardItem[]);
  const indexDataLocal = dataLocal.findIndex((item) => item.id === listCard.id);
  const indexData = data.findIndex((item) => item.id === listCard.id);
  const changeIcon = () => {
    isFill(heartFill);
    setTimeout(() => {
      isFill(heart);
    }, 1000);
    setClassText("text-heart icon-heart");
    if (data.includes(listCard)) {
      data[indexData].like = listCard.like + 1;
      setData(data);
    } else {
      dataLocal[indexDataLocal].like = listCard.like + 1;
      localStorage.setItem("items", JSON.stringify(dataLocal));
      setListCard(dataLocal);
    }
  };
  const openPostComment = () => {
    setIsPost(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setIsPost(true);
  };
  const onclikContent = () => {
    setIsPost(true);
  };
  const onclick = () => {
    setOpen(false);
    setIsPost(false);
  };

  return (
    <>
      <Col xs={24} sm={12} md={12} lg={12}>
        <Card className="card">
          <div onClick={showDrawer}>
            <Row className="card-content">
              <Col xs={6} sm={6} md={6} lg={6}>
                <img
                  className="img-card"
                  src={listCard.image ? listCard.image : imgDefault}
                  alt="image default"
                />
              </Col>
              <Col  xs={16} sm={17} md={16} lg={17} className="content-detail-card">
                <h2 className="title">{listCard.name}</h2>
                <p className="text-content">{listCard.description}</p>
              </Col>
            </Row>
          </div>
          <Flex className="heart-group" gap={24} justify={"flex-end"}>
            <Flex gap={8}>
              <button className="btn-icon btn-heart" onClick={changeIcon}>
                <img className="" src={fill} alt="heart" />
              </button>
                <p className={classText}>{toK(listCard.like)}</p>
            </Flex>
            <div>
              <button className="btn-icon btn-heart" onClick={showDrawer}>
                <img src={chat} alt="chat" />
                <p>{toK(listCard?.quantity)}</p>
              </button>
            </div>
          </Flex>
          <div className="drop-menu-icon">
            <DropMenu
              setData={setData}
              listCard={listCard}
              setListCard={setListCard}
              data={data}
              setOpenDrawer={setOpen}
            >
              {" "}
              <button className="btn-icon btn-icon-more" onClick={onclick}>
                <img className="more-icon" src={more} alt=" more icone"></img>
              </button>
            </DropMenu>
          </div>
        </Card>
      </Col>
      <DrawerDetail
        setIsPost={setIsPost}
        openPostComment={openPostComment}
        isPost={isPost}
        onClose={onClose}
        open={open}
        listCard={listCard}
        onclikContent={onclikContent}
        setData={setData}
        setListCard={setListCard}
        data={data}
        setOpen={setOpen}
      ></DrawerDetail>
    </>
  );
}

export default CardState;
