import { Flex, Input, Tooltip } from "antd";
import iconImage from "../../assets/images/image-add-fill.svg";
import close from "../../assets/images/close-fill.svg";
import edit from "../../assets/images/image-edit-fill.svg";
import edit2 from "../../assets/images/edit-2-fill.svg";
import question from "../../assets/images/question-line.svg";

interface UploadWidget {
  image: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFile: (e: any) => void;
  onclick: () => void;
  isDefault: boolean;
}

function UploadWidget({ image, handleFile, onclick, isDefault }: UploadWidget) {
  return (
    <div>
      <Flex vertical justify="center" align="center">
        <Tooltip
          placement="right"
          title={"Please use a square image that's less than 5MB."}
        >
          <div className="gorup-image-icon">
            <label>
              <img
                className="img-popup"
                src={!isDefault && image ? image : iconImage}
                alt="image"
              ></img>
              <div className="overlay">
                <label>
                  <Flex align="center" gap={4}>
                    <img src={edit} alt="Edit icon" className=""></img>
                    <p>Edit</p>
                  </Flex>
                  <Input
                    type="file"
                    name="image"
                    className="input-image"
                    onChange={handleFile}
                  ></Input>
                </label>
              </div>
              <Input
                type="file"
                name="image"
                className="input-image"
                onChange={handleFile}
              ></Input>
            </label>
            {!isDefault && image ? (
              <Flex className="btn-icon-close" vertical>
                <button className="btn-icon " onClick={onclick}>
                  <img
                    className="more-icon"
                    src={close}
                    alt=" close icon"
                  ></img>
                </button>
                <label className="btn-mobile">
                  <Flex align="center" gap={4}>
                    <img src={edit2} alt="Edit icon" className=""></img>
                  </Flex>
                  <Input
                    type="file"
                    name="image"
                    className="input-image"
                    onChange={handleFile}
                  ></Input>
                </label>
              </Flex>
            ) : null}
          </div>
        </Tooltip>
        <Flex gap={8}>
          <label>
            {isDefault || !image ? (
              <p className="text-image primary-color"> Upload image </p>
            ) : null}
            <Input
              type="file"
              name="image"
              className="input-image"
              onChange={handleFile}
            ></Input>
          </label>
          <Tooltip
            placement="top"
            title={"Please use a square image that's less than 5MB."}
          >
            <img src={question} alt="icon question" className="img-circle-question"></img>
          </Tooltip>
        </Flex>
      </Flex>
    </div>
  );
}

export default UploadWidget;
