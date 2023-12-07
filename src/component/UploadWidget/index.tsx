import { Flex, Input, Tooltip, message } from "antd";
import iconImage from "../../assets/images/image-add-fill.svg";
import close from "../../assets/images/close-fill.svg";
import axios from "axios";

interface UploadWidget {
  image?: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

function UploadWidget({ image, setImage }: UploadWidget) {
  const [messageApi, contextHolder] = message.useMessage();
  const presetKey = 'jwa7kthf';
  const cloudName = 'daiaizehs';


  const error = () => {
    messageApi.open({
      type: "error",
      content: "This file is too large.",
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFile = (e: any) => {
    const file = e?.target?.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presetKey);
    if (file.size / 1048576 < 5) {
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        )
        .then((res) => {
          setImage(res.data.secure_url);
        })
        .catch(() => {
          error();
        });
    } else {
      return error();
    }
  };
  const onclick = () => {
    setImage("");
  };

  return (
    <div>
      {contextHolder}
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
