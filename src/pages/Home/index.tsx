import {
  Pagination as AntPagination,
  Flex,
  Input,
  PaginationProps,
  Row,
} from "antd";
import Layout from "../../component/Layout";
import CardState from "../../component/Card";
import { CardItem } from "../../interface/card";
import { Cards } from "../../constant/data";
import { useEffect, useState } from "react";
import NotFound from "../NotFound/indesx";
import arrowLeft from "../../assets/images/arrow-left-s-line.svg";
import arowRight from "../../assets/images/arrow-right-s-line.svg";

function Home() {
  const [listCard, setListCard] = useState<CardItem[]>([]);
  const [data, setData] = useState<CardItem[]>([...Cards]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState<number | undefined>(undefined);

  useEffect(() => {
    const dataLocal: CardItem[] =
      JSON.parse(localStorage.getItem("items") as string) || ([] as CardItem[]);
    setListCard(dataLocal);
  }, []);
  const itemsPerPageDesktop = 10;
  const itemsPerPageMobile = 5;
  const itemsPerPage =
    window.innerWidth >= 768 ? itemsPerPageDesktop : itemsPerPageMobile;
  const totalItems = listCard.length + data.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentList = [...listCard, ...data].slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return (
        <a className="custom-pagination-item">
          <Flex gap={8} className="btn-arrow" align="center">
            <img src={arrowLeft}></img>Prev
          </Flex>
        </a>
      );
    }
    if (type === "next") {
      return (
        <a className="custom-pagination-item">
          {" "}
          <Flex gap={8} className="btn-arrow" align="center">
            Next<img src={arowRight}></img>
          </Flex>
        </a>
      );
    }
    return originalElement;
  };
  useEffect(() => {
    if (searchPage !== undefined) {
      setCurrentPage(
        Math.max(1, Math.min(searchPage, Math.ceil(totalItems / itemsPerPage)))
      );
    }
  }, [searchPage, totalItems, itemsPerPage]);

  const handleChangePage = (page: number) => {
    setSearchPage(undefined);
    setCurrentPage(page);
  };

  const handleSearchPage = (inputPage: number | string) => {
    const pageNumber = parseInt(inputPage as string, 10);
    if (!isNaN(pageNumber) && pageNumber >= 0) {
      setSearchPage(pageNumber);
    } else {
      setSearchPage(undefined);
    }
    if (inputPage === "") {
      setSearchPage(1);
    }
  };

  return (
    <>
      <Layout setListCard={setListCard} setData={setData}>
        {totalItems >= 1 ? (
          <>
            <Row className="list" gutter={[16, 16]}>
              {currentList.map((item: CardItem, index: number) => (
                <CardState
                  setListCard={setListCard}
                  setData={setData}
                  listCard={item}
                  key={index}
                  data={data}
                ></CardState>
              ))}
            </Row>
            {totalItems > itemsPerPage ? (
              <Flex justify="flex-end" className="pagination" align="center">
                <AntPagination
                  current={searchPage !== undefined ? searchPage : currentPage}
                  total={totalItems}
                  pageSize={itemsPerPage}
                  onChange={handleChangePage}
                  showLessItems={true}
                  itemRender={itemRender}
                />
                <Flex gap={8} className="input-group" align="center">
                  <p>Page</p>
                  <Input
                    className="input-page"
                    type="number"
                    size="small"
                    step="1"
                    defaultValue={currentPage}
                    onChange={(e) => handleSearchPage(e.target.value)}
                  />
                  <p>of{Math.ceil(totalItems / itemsPerPage)}</p>
                </Flex>
              </Flex>
            ) : null}
          </>
        ) : (
          <NotFound></NotFound>
        )}
      </Layout>
    </>
  );
}

export default Home;
