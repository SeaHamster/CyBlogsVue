import request from '@/utils/request'

export function getCommentWithChildById(id) {
    return request({
      url: '/admin/comment/getCommentWithChildById/' + id,
      method: 'get'
    })
  }

  export function setDeleted(commentId, isDelete) {
    const data = {
        commentId,
        isDelete
    }
    return request({
      url: '/admin/comment/setDeleted',
      method: 'post',
      data: data
    })
  }
