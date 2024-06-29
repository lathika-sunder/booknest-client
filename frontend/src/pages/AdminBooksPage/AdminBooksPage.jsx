import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import { Button, Dialog, DialogContent, Pagination } from "@mui/material";
import { Delete } from "@mui/icons-material";

import ViewUserComp from "../../components/ViewUserComp/ViewUserComp";
import DeleteUserComp from "../../components/DeleteUserComp/DeleteUserComp";
import SearchComp from "../../components/SearchComp/SearchComp";
import axios from "axios";

const ITEMS_PER_PAGE = 5;

export default function AdminBooksPage() {
  const [data, setData] = useState([]);

  let index = 0;
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [suggestions, setSuggestions] = useState([])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);


  const onDeleteUser = (deletedUserId) => {
    setData((prevData) =>
      prevData.filter((user) => user._id !== deletedUserId)
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("https://booknest-server-blue.vercel.app/api/v1/booknest/book/getBooks");
        if (response.ok) {
          let jsonData = await response.json();
          setData(jsonData.books);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    var options = [];
    data.map((user) => {
      options.push(user.name)

    })
    setSuggestions(options)
  }, [data.length]);

  const handleOpenDialog = (userId) => {
    console.log(userId)
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (query) => {
    console.log(query)
    axios.get(`http://localhost:4040/api/v1/booknest/book/searchBooks/?query=${query}`)
    .then((response)=>{
      setData(response.data)
      console.log(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  var options=[]
  data.map((book)=>{
      options.push(book.bookName)
  })


  return (
    <div className="admin-home">
      <SearchComp onSearch={handleSearch} suggestions={options} />
      <div className="user-table">
        <Table hoverRow>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Pubisher</th>
              <th>Genre</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>
          <tbody
            style={{
              // fontSize: "x-small",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            {currentData.map((row) => (

              <tr key={row._id}>
                <td>{index += 1}</td>
                <td>{row.bookName}</td>
                <td>{row.author}</td>
                <td>{row.publisher}</td>
                <td>{row.genre}</td>
                <td>
                  <div className="action-buttons">
                    <Button
                      variant="contained"
                      onClick={() => handleOpenDialog(row._id)}
                    // style={{ fontSize: 15, height: 20 }}   
                    >
                      View Book
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      style={{ marginLeft: 6 }}
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      <Delete />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            {selectedUserId && <ViewUserComp userId={selectedUserId} />}
          </DialogContent>
        </Dialog>
        <div className="pagination">
          <Pagination
            count={Math.ceil(data.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          // size="small"
          />
        </div>
        {isDeleteDialogOpen && (
          <DeleteUserComp
            userId={selectedUserId}
            open={isDeleteDialogOpen}
            handleClose={() => {
              setIsDeleteDialogOpen(false);
            }}
            onDeleteUser={onDeleteUser}
          />
        )}
      </div>
    </div>
  );
}
