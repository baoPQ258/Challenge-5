import { CardItem } from "../../interface/card";
import Header from "../Header";

interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  setListCard: React.Dispatch<React.SetStateAction<CardItem[]>>
  setData : React.Dispatch<React.SetStateAction<CardItem[]>> 
}

function Layout({ children,setListCard,setData }: LayoutProps) {
  return (
    <>
      <div className="container">
        <Header setListCard={setListCard} setData={setData}></Header>
        {children}
      </div>
    </>
  );
}

export default Layout;
