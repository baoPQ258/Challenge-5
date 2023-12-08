import { Flex, Input, Tooltip } from "antd";
import iconImage from "../../assets/images/image-add-fill.svg";
import close from "../../assets/images/close-fill.svg";

interface UploadWidget {
  image?: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFile: (e: any) => void;
}

function UploadWidget({ image, setImage, handleFile }: UploadWidget) {
  const onclick = () => {
    setImage("");
  };

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
                src={image ? image : iconImage}
                alt="image"
              ></img>
              <Input
                type="file"
                name="image"
                className="input-image"
                onChange={handleFile}
              ></Input>
            </label>

            {image ? (
              <button className="btn-icon btn-icon-close" onClick={onclick}>
                <img className="more-icon" src={close} alt=" close icon"></img>
              </button>
            ) : null}
          </div>
        </Tooltip>
        <label>
          {!image ? <p className="text-image"> Upload image</p> : null}
          <Input
            type="file"
            name="image"
            className="input-image"
            onChange={handleFile}
          ></Input>
        </label>
      </Flex>
    </div>
  );
}

export default UploadWidget;
