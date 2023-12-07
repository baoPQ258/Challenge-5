import { Flex } from "antd";
import { Comment } from "../../interface/card";

interface CommentProps {
  comment: Comment;
}

function Comment({ comment }: CommentProps) {
  const now = new Date();

  const date = Date.parse(String(comment.date));
  const dateComment = new Date(date);
  const timeDiff = now.getTime() - date;

  const seconds = Math.round(timeDiff / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  // const dateParts = comment.date ? comment.date.toLocaleDateString() : '';

  return (
    <>
      <Flex gap={8} vertical>
        <Flex gap={4} vertical>
          <p className="comment-name">{comment.name}</p>
          <p className="comment-text">{comment.description}</p>
        </Flex>
        {comment?.date ? (
          <p className="comment-time">
            {days > 0
              ? `${
                  dateComment.getDate() >= 10
                    ? dateComment.getDate()
                    : `0${dateComment.getDate()}`
                }-${dateComment.getMonth() + 1}-${dateComment.getFullYear()}`
              : hours > 0
              ? `${hours} hours ago`
              : `${minutes} minutes ago`}{" "}
          </p>
        ) : (
          <p className="comment-time">16 hour ago</p>
        )}
      </Flex>
    </>
  );
}

export default Comment;
