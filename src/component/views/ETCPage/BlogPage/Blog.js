import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import "./blog.css";
import axios from "axios";
function Blog(props) {
  const user = useSelector((state) => state.user);
  const postOn = () => {
    if (user.userData && user.userData.isAuth) {
      props.history.push("/blog/write");
      //window.location.replace("/blog/write");
    }
  };
  const [Board, setBoard] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(10);
  const [boardCnt, setboardCnt] = useState([]);
  const [Page, setPage] = useState(1);

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };
    axios.get("/api/blog/countBoards").then((response) => {
      if (response.data.success) {
        console.log("게시판개수", response.data.counts);
        calculateBoard(response.data.counts);
        
      } else {
        alert("게시판의 개수를 가져오는데에 실패했습니다.");
      }
    });
    getBoards(body);
    changedPage();

  }, []);
  const calculateBoard = (cnt) =>{
    let pageArr = []
    for(let i=1; i<=Math.ceil(cnt/Limit); i++){
      pageArr.push(i)
    }
   
    setboardCnt(pageArr);
    
  }

  useEffect(() => {
    console.log("boardCnt",boardCnt)
  }, [boardCnt])



  


  const getBoards = (body) => {
    axios.post("/api/blog/boards", body).then((response) => {
      if (response.data.success) {
        setBoard(response.data.boards);
        // console.log("response data board", response.data.boards);
      } else {
        alert("게시판의 정보를 가져오지 못했습니다.");
      }
    });
  };

  const renderBoards = Board.map((list, index) => {
    return (
      <div className="list_grid list_data" key={index}>
        <div>{list.title}</div>
        <div></div>
        <div className="acenter">{list.createdAt.slice(0, 10)}</div>
      </div>
    );
  });

  const renderButtons = boardCnt.map((list, index) =>{
    return(
      <li key={index} className='page_num' onClick={() =>changePage(list)}>{list}</li>
    )
  })

  const changePage = (numBtn) =>{
    setPage(numBtn);
    sessionStorage.setItem('page', numBtn);
  }

  const changedPage = () =>{
    if(sessionStorage.page){
      setPage(Number(sessionStorage.page))
      return Number(sessionStorage.page)
    }
    return 1
  }

  return (
    <div className="blog">
      <div id="blog-left">
        <h3>Left Side</h3>
        <Button onClick={postOn}>글쓰기</Button>
      </div>

      <div className="List">
        <div className="list_grid list_tit">
          <div> 제목 </div>
          <div> 조회수 </div>
          <div className="acenter"> 날짜 </div>
        </div>

        <div>{renderBoards}</div>

        <div className='paging_div'><div></div><div><ul>{renderButtons}</ul></div></div>

      </div>


      <div id="blog-right">
        <h3>Right Side</h3>
      </div>
    </div>
  );
}

export default Blog;
