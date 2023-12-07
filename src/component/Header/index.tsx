import { Flex, Input } from "antd";
import social from "../../assets/images/social.svg";
import add from "../../assets/images/add-line.svg";
import search from "../../assets/images/search-line.svg";
import PopUp from "../PopUp";
import { useEffect, useState } from "react";
import { CardItem } from "../../interface/card";
import { message } from "antd";
import { v4 as uuid } from "uuid";
import { upperCase } from "../../util/upperCase";
import { Cards } from "../../constant/data";
import closeIcon from "../../assets/images/close-line.svg";
import searchBlack from "../../assets/images/search-line (1).svg";

interface HeaderProps {
  setListCard: React.Dispatch<React.SetStateAction<CardItem[]>>;
  setData: React.Dispatch<React.SetStateAction<CardItem[]>>;
}

function Header({ setListCard, setData }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const [image, setImage] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CardItem[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [clickedInsideDropdown, setClickedInsideDropdown] = useState(false);
  const dataLocal: CardItem[] =
    JSON.parse(localStorage.getItem("items") as string) || ([] as CardItem[]);
  const updatedHistory = [searchTerm, ...searchHistory.slice(0, 4)];
  const showModal = () => {
    setOpen(true);
    setImage("");
  };
  const [messageApi, contextHolder] = message.useMessage();
  const handleSearch = (value: string) => {
    if (value.trim() === "") {
      setListCard([]);
      setData([]);
    }
    const results = dataLocal.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    const resultsData = Cards.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    if (results.concat(resultsData).length < 1) {
      setListCard([]);
      setData([]);
    } else {
      setSearchResults(results.concat(resultsData));
      setListCard(results.concat(resultsData));
      setData([]);
    }
    setIsDropdownOpen(false);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: `Successfully create`,
      className: "custom-class",
      duration: 3,
    });
  };
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[a-zA-Z ]+$/;
    if (e.target.value === "") {
      e.target.style.border = "1px solid #DBDBDB";
    } else if (!pattern.test(e.target.value)) {
      e.target.style.border = "1px solid red";
    } else {
      e.target.style.border = "1px solid #DBDBDB";
    }
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
    if (e.target.value.trim()) {
      setIsDropdownOpen(true);
    } else if (!e.target.value.trim() && searchHistory) {
      setIsDropdownOpen(true);
    }
    const results = dataLocal.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
    );
    const resultsData = Cards.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
    );
    if (results.concat(resultsData).length >= 1) {
      setSearchResults(results.concat(resultsData));
    } else {
      setSearchResults([]);
    }
  };
  const handleOk = (valueInput: string, valueDescription: string) => {
    setOpen(false);
    const data: CardItem = {
      id: small_id,
      name: upperCase(valueInput),
      description: upperCase(valueDescription),
      like: 0,
      quantity: 0,
      comment: [],
      image: image,
    };
    const dataLocalString = localStorage.getItem("items");
    const dataLocal: CardItem[] = dataLocalString
      ? JSON.parse(dataLocalString)
      : [];
    dataLocal.unshift(data);
    localStorage.setItem("items", JSON.stringify(dataLocal));
    setListCard(dataLocal);
    success();
  };
  const handleCancel = () => {
    setOpen(false);
    setImage("");
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
      setIsDropdownOpen(false);
    }
  };
  const handleTerm = (value: CardItem) => {
    setData([]);
    setListCard([value]);
    if (value.name) {
      setIsDropdownOpen(false);
    }
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };
  const deleteHistory = (itemToDelete: string) => {
    const updatedHistory = searchHistory.filter(
      (item) => item !== itemToDelete
    );
    setIsDropdownOpen(false);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };
  const handleBlur = () => {
    setTimeout(() => {
      if (!clickedInsideDropdown) {
        setIsDropdownOpen(false);
      } else {
        setIsDropdownOpen(true);
      }
    }, 0);
  };
  const highlightKeyword = (text: string) => {
    const regex = new RegExp(searchTerm, "gi");
    return text.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
  };
  useEffect(() => {
    const historyFromStorage = localStorage.getItem("searchHistory");
    if (historyFromStorage) {
      setSearchHistory(JSON.parse(historyFromStorage));
    }
  }, []);
  return (
    <>
      {contextHolder}
      <Flex gap={24} vertical className="header-2">
        <Flex
          align="center"
          justify="space-between"
          onClick={() => setClickedInsideDropdown(false)}
        >
          <div className="">
            <a href="/">
              <img src={social} alt=" Social card"></img>
            </a>
          </div>
          <div className="header">
            {open ? (
              <PopUp
                handleOk={handleOk}
                handleCancel={handleCancel}
                open={open}
                name={"create"}
                image={image}
                setImage={setImage}
              >
                <button className="btn-add btn-add-2" onClick={showModal}>
                  <img src={add} alt="plus icon"></img>
                </button>
              </PopUp>
            ) : (
              <button className="btn-add btn-add-2" onClick={showModal}>
                <img src={add} alt="plus icon"></img>
              </button>
            )}
          </div>
        </Flex>
        <Flex
          className="dropdown-search dropdown-search-2"
          onClick={() => setClickedInsideDropdown(true)}
          onBlur={() => setClickedInsideDropdown(false)}
        >
          <Input
            className="input-2"
            placeholder="Search..."
            value={searchTerm}
            maxLength={50}
            onChange={inputChange}
            onPressEnter={handleKeyPress}
            onBlur={handleBlur}
            onFocus={inputChange}
            addonBefore={
              <button
                className="btn-icon-search btn-icon-search-2"
                onClick={() => handleSearch(searchTerm)}
              >
                <img className="img" src={searchBlack} alt="Search" />
              </button>
            }
          />
          <ul
            onMouseDown={() => setIsDropdownOpen(true)}
            className={`dropdown-content-search w-87 ${
              isDropdownOpen ? "open" : ""
            }`}
          >
            {searchTerm.trim() ? (
              searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <li
                    className="term"
                    key={item.id}
                    onClick={() => handleTerm(item)}
                    dangerouslySetInnerHTML={{
                      __html: highlightKeyword(item.name),
                    }}
                  />
                ))
              ) : (
                <li className="term">No results</li>
              )
            ) : (
              searchHistory.map((item: string, index: number) => (
                <li className="term" key={index} onClick={() => handleSearch}>
                  <Flex justify="space-between">
                    {" "}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: highlightKeyword(item),
                      }}
                    />
                    <img
                      src={closeIcon}
                      alt="close button"
                      onClick={() => deleteHistory(item)}
                    />
                  </Flex>
                </li>
              ))
            )}
          </ul>
        </Flex>
      </Flex>
      <Flex className="header-1" align="center" vertical gap={32}>
        <div className="">
          <a href="/">
            <img src={social} alt=" Social card"></img>
          </a>
        </div>
        <div className="header">
          {open ? (
            <PopUp
              handleOk={handleOk}
              handleCancel={handleCancel}
              open={open}
              name={"create"}
              image={image}
              setImage={setImage}
            >
              <button className="btn-add" onClick={showModal}>
                <img src={add} alt="plus icon"></img>
                <span>Create new card</span>
              </button>
            </PopUp>
          ) : (
            <button className="btn-add" onClick={showModal}>
              <img src={add} alt="plus icon"></img>
              <span>Create new card</span>
            </button>
          )}
          <Flex
            className="search-group dropdown-search"
            onClick={() => setClickedInsideDropdown(true)}
            onBlur={() => setClickedInsideDropdown(false)}
          >
            <Input
              className="search"
              placeholder="Search..."
              value={searchTerm}
              maxLength={50}
              onChange={inputChange}
              onPressEnter={handleKeyPress}
              onBlur={handleBlur}
              onFocus={inputChange}
            />
            <button
              className="btn-icon-search"
              onClick={() => handleSearch(searchTerm)}
            >
              <img className="img" src={search} alt="Search" />
            </button>
            <ul
              className={`dropdown-content-search w-87 ${
                isDropdownOpen ? "open" : ""
              }`}
            >
              {searchTerm.trim() ? (
                searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <li
                      className="term"
                      key={item.id}
                      onClick={() => handleTerm(item)}
                      dangerouslySetInnerHTML={{
                        __html: highlightKeyword(item.name),
                      }}
                    />
                  ))
                ) : (
                  <li className="term">No results</li>
                )
              ) : (
                searchHistory.map((item: string, index: number) => (
                  <li className="term" key={index} onClick={() => handleSearch}>
                    <Flex justify="space-between">
                      {" "}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: highlightKeyword(item),
                        }}
                      />
                      <img
                        src={closeIcon}
                        alt="close button"
                        onClick={() => deleteHistory(item)}
                      />
                    </Flex>
                  </li>
                ))
              )}
            </ul>
          </Flex>
        </div>
      </Flex>
    </>
  );
}

export default Header;
