import React from 'react'
import {  Container} from '../components/index'
import PostForm from '../components/post-form/PostForm'
function AddPost() {
  return (
   <div className="py-8">
      <Container>
        <PostForm/>
      </Container>
    </div>
  )
}

export default AddPost