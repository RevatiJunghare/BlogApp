import { styled } from "styled-components";




export const WrapperBlog = styled.div`
& {
    .blog-component{
        display:grid;
        grid-template-columns: repeat(3, 1fr);
        gap:40px;
        margin-top:40px;
    }
    .blog-box{
        // border:1px solid gray;
        margin-bottom:20px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    .header-box{
        // border:1px solid gray;
        display:flex;
        flex-direction:row;
        justify-content:space-between;
         padding:0px 20px;
    }
    .blog-title{
        font-family:sans-serif;
        font-weight:bold;
        font-size:20px;
    }
    .desc-box{
        padding:10px 20px;
        white-space: nowrap;
        width: 350px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
`