import { Flex } from "antd";
import notFound from "../../assets/images/not-found.svg";

function NotFound() {
  return (
    <>
      <div className="page-not-found">
        <Flex align="center" justify="center" vertical gap={4}>
          <img src={notFound}></img>
          <p className="text">Sorry, no result found</p>
          <p className="text-description">
            Try adjusting your search to find what you’re looking for.
          </p>
        </Flex>
      </div>
    </>
  );
}

export default NotFound;
