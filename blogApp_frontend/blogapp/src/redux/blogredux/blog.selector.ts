import { RootState } from "../store";




export const allblogdata = (state:RootState)=> state.blogreducer.data.blogData;
export const allcommentsdata = (state:RootState)=>state.blogreducer.data.AllComments;
export const allLikes = (state:RootState)=>state.blogreducer.data.likes