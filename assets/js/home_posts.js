{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                   let newPost=newPostDom(data.data.post);
                    $(`#posts-list-container>ul`).prepend(newPost);
                    deletePost($(' .delete-post-button',newPost))

                    new PostComments(data.data.post._id)
                    new ToggleLike($('.toggle-like-button',newPost))   
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                    
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom=function(post){
        console.log(post)
        return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
            </small>
            ${ post.content}
            <br>
            <small>
                ${ post.user.name }
            </small>
            <br>
            <small>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                    0 Likes
                </a>

            </small>
        </p>
        <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="${ post._id }" >
                    <input type="submit" value="Add Comment">
                </form>
        
            <div class="post-comments-list">
                <ul id="post-comments-${ post._id }">
                </ul>
            </div>
        </div>
        
    </li>`)
    }

    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post._id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },
                error:function(error){
                    console.log(error.responseText)
                }
            })
        })
    }

    // let createComment = function(){
    //     let newCommentForm = $('#new-comment-form');

    //     newPostForm.submit(function(e){
    //         e.preventDefault();

    //         $.ajax({
    //             type: 'post',
    //             url: '/comments/create',
    //             data: newCommentForm.serialize(),
    //             success: function(data){
    //                let newComment=newCommentDom(data.data.comment);
    //                 $(`#comment-list-container>ul`).prepend(newComment);
    //                 deleteComment($(' .delete-comment-button',newComment))
    //             }, error: function(error){
    //                 console.log(error.responseText);
    //             }
    //         });
    //     });
    // }

    // let newCommentDom=function(comment){
    //     return $(`<li id="comment-${comment._id}"> 
    //     <p>
    //         <small>
    //             <%if((locals.user)&&(locals.user.id==comment.user.id)){%>
    //             <a class="delete-comment-button" href="/comments/destroy/${comment._id}">Delete</a>
    //         </small>
    //         <%}%>
    //         ${ comment.content}
    //         <br>
    //         <small>
    //            ${ comment.user.name}
    //         </small>
    //     </p>    
    
    // </li> `)
    // }

    // let deleteComment=function(deleteLink){
    //     $(deleteLink).click(function(e){
    //         e.preventDefault();
    //         $.ajax({
    //             type:'get',
    //             url:$(deleteLink).prop('href'),
    //             success:function(data){
    //                 $(`#comment-${data.data.comment_id}`).remove();
    //             },
    //             error:function(error){
    //                 console.log(error.responseText)
    //             }
    //         })
    //     })
    // }

   
    createPost();
    // createComment();
    convertPostsToAjax();

}