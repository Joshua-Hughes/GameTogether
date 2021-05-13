import React, { useContext, createRef, useState } from "react"
import { ThreadContext } from "../../providers/ThreadProvider"
import { Button } from "reactstrap"

export const ThreadCard = ({ comment, userProfile, topic }) => {

    const Edit = createRef()

    const { getThreadByTopic, DeleteComment, EditComment } = useContext(ThreadContext)

    const [updatedComment, setUpdatedComment] = useState({
        "id": comment.id,
        "topicId": comment.topicId,
        "threadComment": comment.threadComment,
        "commentCreationDate": comment.commentCreationDate
      })

    const handleCommentDelete = () => {
        DeleteComment(comment.id)
            .then(() => getThreadByTopic(topic))
    }

    const handleCommentEdit = () => {
        if (comment.threadComment === "") {
          window.alert("Please write a comment!")
        } else {
        EditComment({
          id: updatedComment.id,
          topicId: updatedComment.topicId,
          threadComment: updatedComment.threadComment,
          commentCreationDate: updatedComment.commentCreationDate
        })
          getThreadByTopic(topic)
          Edit.current.close()
      }
      };
    
    const handleControlledInputChange = (event) => {
        const freshComment = { ...updatedComment };
    
        freshComment[event.target.id] = event.target.value
        setUpdatedComment(freshComment);
      }

    if (comment.authorId === userProfile.id) {
        return (
            <>
                <div className='comment'>{comment.threadComment}</div>
                <div className='author'>{comment.author.displayName}</div>
                <div className='commentDate'>{comment.commentCreationDate}</div>
                <Button color="primary" onClick={handleCommentDelete}>
                    Delete Comment
                    </Button>
                <Button color="primary" onClick={e => Edit.current.showModal()}>
                    Edit Comment
                    </Button>

                <dialog className="EditComment" ref={Edit}>
                    <section className="commentBox">
                        <h3 className="popupHeader">Editing:</h3>
                        <div className="form-group">
                            <label htmlFor="threadComment"></label>
                            <textarea name="threadComment" id="threadComment" rows="20" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Content" value={updatedComment.threadComment} />
                        </div>
                        <Button onClick={handleCommentEdit}>
                            Update Comment
                        </Button>
                        <Button onClick={e => Edit.current.close()}>
                            Cancel
                        </Button>
                    </section>
                </dialog>
            </>
        )
    } else {
        return (
            <>
                <div className='comment'>{comment.threadComment}</div>
                <div className='author'>{comment.author.displayName}</div>
                <div className='commentDate'>{comment.commentCreationDate}</div>
            </>
        )
    }
}